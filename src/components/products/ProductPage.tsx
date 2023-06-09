import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useParams } from 'react-router-dom';
import { getSingleProduct } from "../../app/storeSlice";
import styles from "./ProductPage.module.scss";

interface IProps {
  id : number,
};

const ProductPage : FC<IProps> = (props) => {
  const state = useAppSelector(state => state.store);
  const dispatch = useAppDispatch();
  const {productID} = useParams();
  
  useEffect(() => {
    if (typeof productID === "string")
    dispatch(getSingleProduct(productID));
  },[dispatch, productID]);

  return (
    <>
      {state.loading === false &&
      <div className={styles.product}>
        <div className={styles.wrapper}>
          <div className={styles.productImgContainer}>
            <img src={state.product?.image} alt="product-img" className={styles.productImg}/>
          </div>
          <div className={styles.productInfoContainer}>
            <h1 className={styles.productTitle}>{state.product?.title}</h1>
            <p className={styles.productCategory}>{state.product?.category}</p>
            <span className={styles.productLine}></span>
            <p className={styles.productPrice}>{state.product?.price} $</p>
            <button className={styles.productButton}>Add to card</button>
          </div>
        </div>
        <div className={styles.productDescriptionContainer}>
          <p className={styles.productDescriptionTitle}>Description:</p>
          <p className={styles.productDescription}>{state.product?.description}</p>
        </div>
      </div>}
    </>
  );
};

export default ProductPage;