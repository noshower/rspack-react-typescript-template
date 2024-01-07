import { useEffect, useState } from 'react';
import axios from 'axios';

export const Home = () => {
  const [data, setData] = useState<{ user?: { id: string; name: string } }>({});

  useEffect(() => {
    axios.get('/api/user').then((res) => {
      setData({
        user: res.data,
      });
    });
  }, []);

  return <div>用户名：{data.user?.name}</div>;
};
