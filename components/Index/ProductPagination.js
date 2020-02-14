import { Container, Pagination } from 'semantic-ui-react';
import { useRouter } from 'next/router';

const ProductPagination = ({ totalPages }) => {
  const router = useRouter();
  return (
    <Container
      textAlign="center"
      style={{ margin: '2em' }}
    >
      <Pagination
        defaultActivePage={1}
        totalPages={totalPages}
        onPageChange={(event, { activePage }) => {
          activePage === 1 ? router.push('/') : router.push(`/?page=${activePage}`)
        }}
      />
    </Container>
  );
};

export default ProductPagination;
