import { useEffect, useState } from 'react';
import api from '../utils/api';
import { delayResponse } from '../utils/delayResponse';

const useFetch = (endpoint: string, delay: number = 1000) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        await delayResponse(delay);

        const response = await api.get(endpoint);
        setData(response.data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError(String(error));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, delay]);

  return { data, loading, error };
};

export default useFetch;
