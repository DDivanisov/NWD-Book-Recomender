<template>
    <div v-if="loading" class="spinner">Loading...</div>
    <div v-else class="wrap">
      <div class="add-comment">
        Leave a comment
        <span>
          <button @click="toggleCommentForm" class="comm-btn">{{ showForm ? '-' : '+' }}</button>
        </span>
      </div>
  
      <div v-if="showForm" class="comment-form">
        <textarea v-model="newCommentDescription" placeholder="Enter your comment here..."></textarea>
        <button @click="submitComment" style="margin-right: 10px;">Send</button>
      </div>
  
      <div v-if="localComments.length === 0">No Comments</div>
      <div v-else v-for="comment in localComments" :key="comment.createdAt" class="comm-detail">
        <div>
          <h4>{{ comment.user }}</h4>
          <h6>{{ comment.createdAt }}</h6>
        </div>
        <div class="description">{{ comment.description }}</div>
        <div>
          <button v-if="comment.user === username || user.username === 'adminDarko'" @click="deleteComment(comment.id)">Remove</button>
        </div>
      </div>
    </div>
  </template>
  
<script>
  import { ref, computed, watch } from 'vue';
  import { useStore } from 'vuex';
  import services from '../../services/services.js';
  
  export default {
    props: {
      username: {
        type: String,
        required: true
      },
      book_id: {
        type: String,
        required: true
      },
      comments: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        required: true
      }
    },
    setup(props) {
      const store = useStore();
      const showForm = ref(false);
      const newCommentDescription = ref('');
      const localComments = ref([]);
      const user = computed(() => store.state.user);
  
      watch(() => props.comments, (newComments) => {
        localComments.value = [...newComments];
      }, { immediate: true });
  
      const toggleCommentForm = () => {
        showForm.value = !showForm.value;
        newCommentDescription.value = '';
      };
  
      const formatDate = () => {
        const now = new Date();
        const offset = 2;
        const utcDate = new Date(now.getTime() + (offset * 60 * 60 * 1000));
  
        const year = utcDate.getFullYear();
        const month = String(utcDate.getMonth() + 1).padStart(2, '0');
        const day = String(utcDate.getDate()).padStart(2, '0');
        const hours = String(utcDate.getHours()).padStart(2, '0');
        const minutes = String(utcDate.getMinutes()).padStart(2, '0');
        const seconds = String(utcDate.getSeconds()).padStart(2, '0');
  
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
      };
  
      const submitComment = async () => {
        if (newCommentDescription.value.trim() === '') {
          alert('Comment description cannot be empty');
          return;
        }
  
        const newComment = {
          book_id: props.book_id,
          user: props.username,
          description: newCommentDescription.value,
          createdAt: formatDate()
        };
        try {
          const response = await services.addComment(newComment);
  
          const addedComment = response.data;
          localComments.value.push(addedComment);
  
          toggleCommentForm();
        } catch (err) {
          console.log(err.response.data.msg);
        }
      };
  
      const deleteComment = async (commentId) => {
        try {
          await services.removeComment({
            book_id: props.book_id,
            commId: commentId
          });
          localComments.value = localComments.value.filter(comment => comment.id !== commentId);
        } catch (err) {
          console.log(err.response.data.msg);
        }
      };
  
      return {
        showForm,
        newCommentDescription,
        localComments,
        user,
        toggleCommentForm,
        submitComment,
        deleteComment
      };
    }
  };
</script>
  
  <style scoped lang="scss">

  .spinner {
    flex: 1 1 100%;
    text-align: center;
    font-size: 24px;
    margin: 20px;
  }

  .wrap {
    background-color: rgb(173, 216, 230, 0.8);
  }
  .add-comment {
    border: solid black 2px;
    border-radius: 5%;
    margin-top: 10px;
    padding: 10px;
  }
  .add-comment span {
    margin-left: 10px;
  }
  .comm-btn {
    border: none;
    background-color: lightcyan;
  }
  .comment-form {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  
    textarea {
      width: 95%;
      height: 100px;
      padding: 10px;
      margin: 10px;
      align-self: center;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
  
    button {
      align-self: flex-end;
      padding: 10px 20px;
      border: none;
      border-radius: 4px;
      background-color: #007bff;
      color: #fff;
      cursor: pointer;
  
      &:hover {
        background-color: #0056b3;
      }
    }
  }

  .comm-detail{
    border: solid black 1px;
    padding: 10px;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;

    div {
      margin-right: 5px;
      padding: 5px;

      button {
        border: soldi red 1px;
        border-radius: 5%;
        min-width: 80px;
        color: white;
        background-color: red;
        margin-top: 10px;
        padding: 8px;
      }
    }
    .description {
      border: gray solid 1px;
      background-color: lightgray;
      padding: 20px;
      max-width: 70%;
    }
    
  }
  </style>
  