import { useState, useEffect } from 'react';
import {
  Form,
  Input,
  TextArea,
  Button,
  Image,
  Message,
  Header,
  Icon,
} from 'semantic-ui-react';

import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const INITIAL_PRODUCT = {
  name: '',
  price: '',
  media: '',
  description: '',
};

const CreateProduct = () => {
  const [product, setProduct] = useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    const productIsComplete = Object.values(product).every(val => Boolean(val));
    setDisabled(!productIsComplete);
  }, [product, setDisabled]);

  const handleChange = event => {
    const { name, value, files } = event.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: name === 'media' ? files[0] : value,
    }));

    if (name === 'media') {
      setMediaPreview(window.URL.createObjectURL(files[0]));
    }
  };

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', product.media);
    data.append('upload_preset', 'reactreserve');
    data.append('cloud_name', 'kevink520');
    const response = await axios.post(process.env.CLOUDINARY_URL, data); 
    const mediaUrl = response.data.url;
    return mediaUrl;
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      setLoading(true);
      setError('');
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      const { name, price, description } = product;
      const payload = { name, price, description, mediaUrl };
      const response = await axios.post(url, payload);
      console.log({ response });
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch(error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header as="h2" block>
        <Icon name="add" /> {/* color="orange" />*/}
        Create New Product
      </Header>
      <Form
        loading={loading}
        error={Boolean(error)}
        success={success}
        onSubmit={handleSubmit}
      >
        <Message
          error
          header="Oops!"
          content={error}
        />
        <Message
          success
          icon="check"
          header="Success!"
          content="Your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
            control={Input}
            name="name"
            label="Name"
            placeholder="Name"
            onChange={handleChange}
            value={product.name}
          />
          <Form.Field
            control={Input}
            name="price"
            label="Price"
            placeholder="Price"
            min="0.00"
            step="0.01"
            type="number"
            onChange={handleChange}
            value={product.price}
          />
          <Form.Field
            control={Input}
            name="media"
            type="file"
            label="Media"
            accepts="image/*"
            content="Select Image"
            onChange={handleChange}
          />
        </Form.Group>
        <Image
          src={mediaPreview}
          rounded
          centered
          size="small"
        />
        <Form.Field
          control={TextArea}
          name="description"
          label="Description"
          placeholder="Description"
          onChange={handleChange}
          value={product.description}
        />
        <Form.Field
          control={Button}
          color="blue"
          icon="pencil alternate"
          content="Submit"
          type="submit"
          disabled={loading || disabled}
        />
      </Form>
    </>
  );
}

export default CreateProduct;
