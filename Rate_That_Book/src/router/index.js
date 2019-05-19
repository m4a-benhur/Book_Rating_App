import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Contact from '@/components/Contact';
import AddBook from '@/components/AddBook';
import Book from '@/components/Book';
import Register from '@/components/Register';
import Login from '@/components/Login';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact,
    },
    {
      path: '/books/add',
      name: 'AddBook',
      component: AddBook,
    },
    {
      path: '/books/:id',
      name: 'Book',
      component: Book,
    },
    {
      path: '/users/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/users/login',
      name: 'Login',
      component: Login,
    },
  ],
});
