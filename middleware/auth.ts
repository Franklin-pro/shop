import { useUserStore } from "../stores/users";

export default defineNuxtRouteMiddleware((to, from) => {
    const  $auth  = useUserStore();

    const user = $auth.user;
  
    if (!user) {
      return navigateTo('/login');
    }
  
    const { path } = to;
  
    if (path.startsWith('/dashboard/admin') && user.role !== 'admin') {
      return navigateTo('/login');
    }
    if (path.startsWith('/') && user.role !== 'admin') {
      return navigateTo('/login');
    }
  });
  