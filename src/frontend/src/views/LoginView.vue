<template>
  <section>
    <div class="container mt-4 pt-5">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-8 col-md-6 col-lg-5">
          <div class="card border-0 shadow slim-card" style="background-color: rgb(255, 255, 255, 0.7);">
            <div class="card-body">
              <svg class="mx-auto my-3 bi bi-person-circle" xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
              </svg>
              <form @submit.prevent="login">
                <input type="email" name="email" class="form-control my-3 py-2 slim-input" placeholder="Email" v-model="email" aria-label="Email"/>
                <input type="password" name="password" class="form-control my-3 py-2 slim-input" placeholder="Password" v-model="password" aria-label="Password"/>
                <div class="text-center mt-4">
                  <button type="submit" class="btn btn-primary">Login</button>
                  <router-link to="/register" class="nav-link text-blue mt-3">Create an account!</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mt-3">
      <p v-if="err" v-html="err" class="text-danger"></p>
    </div>
  </section>
</template>



<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import services from '../../services/services.js';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const err = ref(null);
    const store = useStore();
    const router = useRouter();

    const login = async () => {
      try {
        const response = await services.login({
          email: email.value,
          password: password.value
        });
        store.dispatch('setToken', response.data.token);
        store.dispatch('setUser', response.data.user);
        store.dispatch('setPage', 1);
        router.push({ name: 'home' });
        err.value = null;
      } catch (error) {
        err.value = formatError(error.response?.data?.msg || 'An error occurred');
      }
    };

    const formatError = (errorMessage) => {
      return errorMessage.replace(/\n/g, '<br>');
    };

    return {
      email,
      password,
      err,
      login
    };
  }
};
</script>

<style scoped lang="scss">

.slim-card {
  width: 100%;
  max-width: 400px;
  min-height: 40px; 
  margin: 0 auto;
  padding: 5px;
}

.slim-input {
  width: 100%;
  padding: 12px; 
}
.text-blue {
  color: #007bff; 
}

.text-blue:hover {
  color: #0056b3; 
}
</style>
