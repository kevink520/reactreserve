import AccountHeader from '../components/Account/AccountHeader';
import AccountOrders from '../components/Account/AccountOrders';
import AccountPermissions from '../components/Account/AccountPermissions';
import { parseCookies } from 'nookies';
import baseUrl from '../utils/baseUrl';
import axios from 'axios';
import catchErrors from '../utils/catchErrors';

const Account = ({ user, orders }) => {
  return (
    <>
      <AccountHeader { ...user } />
      <AccountOrders orders={orders} />
      {user.role === 'root' &&
      <AccountPermissions currentUserId={user._id} />}
    </>
  );
};

Account.getInitialProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);
    if (!token) {
      return { orders: [] };
    }

    const payload = { headers: { Authorization: token } };
    const url = `${baseUrl}/api/orders`;
    const response = await axios.get(url, payload);
    return response.data;
  } catch (error) {
    catchErrors(error, console.log);
    return { orders: [] };
  }
};

export default Account;
