import { Iterator } from "./Iterator";

type User = { name: string; email: string; photo?: string };

(async () => {
  const iterator = new Iterator<User>("http://52.91.207.55:3000/api/search");

  // itera sobre as páginas automaticamente
  for await (const users of iterator) {
    console.log(users);
  }
})();
