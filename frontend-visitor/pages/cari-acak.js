import { useRouter } from 'next/router';
import { getHobbies } from '../api/hobby';


export default function CariAcak() {
  const router = useRouter();

  const getRandomHobby = async () => {
    await getHobbies().then(data => {
      const foundHobbies = data.data.data.hobbies;
      const randomHobby = foundHobbies[Math.floor(Math.random()*foundHobbies.length)];
      return router.push(`/hobby/${randomHobby.slug}`);
    }).catch(err => {
      console.log(err);
    });
  }

  getRandomHobby();
}