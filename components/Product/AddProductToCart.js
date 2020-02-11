import { useState, useEffect } from 'react';
import { Input } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import cookie from 'js-cookie';
import catchErrors from '../../utils/catchErrors';

const AddProductToCart = ({ user, productId }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    let timeout;
    if (success) {
      timeout = setTimeout(() => {
        setSuccess(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [success]);

  const router = useRouter();
  const handleAddProductToCart = async () => {
    try {
      setLoading(true);
      const url = `${baseUrl}/api/cart`;
      const payload = { quantity, productId };
      const token = cookie.get('token');
      const headers = { headers: { Authorization: token } };
      await axios.put(url, payload, headers);
      setSuccess(true);
    } catch(error) {
      catchErrors(error, window.alert);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Input
      type="number"
      min="1"
      value={quantity}
      onChange={event => setQuantity(Number(event.target.value))}
      placeholder="Quantity"
      action={user && success ? {
        color: 'blue',
        content: 'Item Added',
        icon: 'plus cart',
        disabled: true,
      } : (user ? {
        color: 'orange',
        content: 'Add to Cart',
        icon: 'plus cart',
        onClick: handleAddProductToCart,
        loading,
        disabled: loading,
      } : {
        color: 'blue',
        content: 'Sign Up To Purchase',
        icon: 'signup',
        onClick: () => router.push('/signup'),
      })}
    />
  );
};

export default AddProductToCart;
