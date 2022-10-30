
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { LoaderAuth } from '../../utils/Loader/Loader';
import { getCookie } from '../../utils/utils';

export function ProtectedRoute({ children, ...rest }) {
  const cookie = getCookie('token');
  const location = useLocation();
  const loader = useSelector(store => store.authReducer.loader);

  return (
    <LoaderAuth loader={loader}>
      <Route
        {...rest}
        render={() =>
          cookie ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )
        }
      />
    </LoaderAuth>
  );
} 