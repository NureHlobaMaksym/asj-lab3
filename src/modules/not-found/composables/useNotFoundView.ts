import { useRouter } from 'vue-router';

export const useNotFoundView = () => {
  const router = useRouter();

  const goToHome = (): void => {
    router.push('/');
  };

  return {
    goToHome
  };
};
