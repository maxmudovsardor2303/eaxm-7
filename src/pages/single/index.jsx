// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { products } from '@service';

// const Single = () => {
//   const { id } = useParams();
//   const [productData, setProductData] = useState(null);

//   const getProductDetails = async () => {
//     try {
//       const res = await products.getSinglePro(id);
//       if (res.status === 200 && res?.data?.product) {
//         setProductData(res.data.product);
//       }
//     } catch (error) {
//       console.error('Error fetching product details:', error);
//     }
//   };

//   useEffect(() => {
//     getProductDetails();
//   }, [id]);

//   if (!productData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{productData.product_name}</h1>
//       <p>Category ID: {productData.category_id}</p>
//       <p>Description: {productData.description}</p>
//       <p>Made in: {productData.made_in}</p>
//       <p>Colors: {productData.color.join(', ')}</p>
//       <p>Sizes: {productData.size.join(', ')}</p>
//       <p>Count: {productData.count}</p>
//       <p>Cost: ${productData.cost}</p>
//       <p>Discount: {productData.discount}%</p>
//       <p>Age Range: {productData.age_min} - {productData.age_max}</p>
//       <p>For Gender: {productData.for_gender}</p>
//       {productData.image_url && <img src={productData.image_url} alt={productData.product_name} />}
//     </div>
//   );
// };

// export default Single;






import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '@service';

const Single = () => {
  const { id } = useParams();
  const [productData, setProductData] = useState(null);

  const getProductDetails = async () => {
    try {
      const res = await products.getSinglePro(id);
      if (res.status === 200 && res?.data?.product) {
        setProductData(res.data.product);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (!productData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{productData.product_name}</h1>
      <p>Category ID: {productData.category_id}</p>
      <p>Description: {productData.description}</p>
      <p>Made in: {productData.made_in}</p>
      <p>Colors: {productData.color.join(', ')}</p>
      <p>Sizes: {productData.size.join(', ')}</p>
      <p>Count: {productData.count}</p>
      <p>Cost: ${productData.cost}</p>
      <p>Discount: {productData.discount}%</p>
      <p>Age Range: {productData.age_min} - {productData.age_max}</p>
      <p>For Gender: {productData.for_gender}</p>
      {productData.image_url && <img src={productData.image_url} alt={productData.product_name} />}
    </div>
  );
};

export default Single;
