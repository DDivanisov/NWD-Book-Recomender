<template>
  <div class="pagination" v-if="totalPages > 1">
    <button @click="prevPage" :disabled="currentPage === 1">
      <i class="lni lni-arrow-left"></i>
    </button>
    <ul>
      <li @click="changePage(1)" :class="{ active: currentPage === 1 }">1</li>

      <li v-if="showLeftDots" @click="toggleInput('left')" :class="{ dots: true }">
        <template v-if="!inputVisible || inputPosition !== 'left'">...</template>
        <template v-if="inputVisible && inputPosition === 'left'">
          <div class="input-container">
            <input ref="leftInput" type="number" v-model="inputPage" @keyup.enter="goToPage" @blur="hideInput" min="1" :max="totalPages" />
          </div>
        </template>
      </li>

      <li v-for="page in middlePages"  :key="page" @click="changePage(page)" :class="{ active: currentPage === page }">
        {{ page }}
      </li>

      <li v-if="showRightDots" @click="toggleInput('right')" :class="{ dots: true }">
        <template v-if="!inputVisible || inputPosition !== 'right'">...</template>
        <template v-if="inputVisible && inputPosition === 'right'">
          <div class="input-container">
            <input ref="rightInput" type="number" v-model="inputPage" @keyup.enter="goToPage" @blur="hideInput" min="1" :max="totalPages" />
          </div>
        </template>
      </li>

      <li @click="changePage(totalPages)" :class="{ active: currentPage === totalPages }">{{ totalPages }}</li>
    </ul>

    <button @click="nextPage" :disabled="currentPage === totalPages">
      <i class="lni lni-arrow-right"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      inputVisible: false,
      inputPosition: null,
      inputPage: '',
    };
  },
  computed: {
    middlePages() {
      let pages = [];
      if(this.totalPages === 3){
        return [2];
      }
      if( this.totalPages === 2){
        return [];
      }
      if (this.currentPage > 2 && this.currentPage < this.totalPages - 1) {
        pages.push(this.currentPage - 1, this.currentPage, this.currentPage + 1);
      } else if (this.currentPage <= 2) {
        pages.push(2,3);
      } else {
        pages.push(this.totalPages - 2, this.totalPages - 1);
      }
      return pages;
    },
    showLeftDots() {
      return this.currentPage > 3;
    },
    showRightDots() {
      return this.currentPage < this.totalPages - 2;
    },
  },
  methods: {
    nextPage() {
      this.$emit('pageChange', this.currentPage + 1);
      this.hideInput();
    },
    prevPage() {
      this.$emit('pageChange', this.currentPage - 1);
      this.hideInput();
    },
    changePage(page) {
      this.$emit('pageChange', page);
      this.hideInput();
    },
    toggleInput(position) {
      if (this.inputVisible && this.inputPosition === position) {
        this.hideInput();
      } else {
        this.inputVisible = true;
        this.inputPosition = position;
        this.inputPage = '';
        this.$nextTick(() => {
          const inputRef = position === 'left' ? this.$refs.leftInput : this.$refs.rightInput;
          if (inputRef) {
            inputRef.focus();
          }
        });
      }
    },
    hideInput() {
      this.inputVisible = false;
      this.inputPosition = null;
    },
    goToPage() {
      const page = Number(this.inputPage);
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('pageChange', page);
      }
      this.hideInput();
    },
  },
};
</script>

<style scoped lang="scss">
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 255, 255, 0.5);
  gap: 10px;
  padding: 10px 40px;
  border-radius: 6px;
  margin-top: 0;
  height: 120px;
  position: relative;
}

.pagination button {
  display: inline-flex;
  align-items: center;
  font-size: 22px;
  font-weight: 500;
  color: #383838;
  background-color: transparent;
  outline: none;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
.pagination button:hover {
  color: blue;
}

ul {
  margin: 20px 30px;
  padding: 0;
  list-style: none;
  position: relative;
}

ul li {
  display: inline-block;
  margin: 0 10px;
  background-color: #ccc;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  text-align: center;
  font-size: 22px;
  font-weight: 500;
  line-height: 45px;
  cursor: pointer;
  position: relative;
}

ul li:hover {
  background-color: #3b7ddd;
}

li.active {
  background-color: #3b7ddd;
  color: #fff;
}

.dots {
  cursor: pointer;
  width: 45px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-size: 22px;
  position: relative;
}

.input-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 45px;
  height: 45px;
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.input-container input {
  width: 100%;
  height: 100%;
  padding: 0;
  font-size: 18px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-sizing: border-box;
  outline: none;
  -moz-appearance: textfield;
  appearance: textfield;
}

.input-container input::-webkit-inner-spin-button,
.input-container input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>