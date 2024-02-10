import React from 'react';
import styles from '../styles/admin-pannel.module.scss';
import { IOrderData } from '@/models/paymentInfo/IOrderRecievedData';
import { toFixedFunc } from '@/helpers/utils';

interface OrderInfoProps {
  order: IOrderData;
}

const OrderInfo: React.FC<OrderInfoProps> = ({ order }) => {
  const dateObject = new Date(order.dateTime);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  } as Intl.DateTimeFormatOptions;

  const formattedDateString = dateObject.toLocaleDateString('en-US', options);

  return (
    <>
      <div className={styles.item}>
        <div className={styles.info}>
          <div className={styles.header}>
            <div className={styles.rightPart}>
              <div className={styles.rightPart__title}> Transaction ID: {order.transactionID}</div>
              <div className={styles.rightPart__title_first}></div>
            </div>
          </div>
          <div className={styles.info__divider}></div>
          <div className={styles.body}>
            <div className={styles.thirdBlock}>
              <h3 className={styles.blockTitle}>Total :${order.orderTotal}</h3>
              <div className={styles.cell}>
                <div className={styles.cell__label}>Email:</div>
                <div className={styles.cell__value}>{order.Email}</div>
              </div>
              <div>
                <div className={styles.greenLabel}>{order.pricingPlan}</div>
              </div>
            </div>
            <div className={styles.secondBlock}>
              <div className={styles.cell}>
                <div className={styles.cell__label}>Payment Method:</div>
                <div className={styles.cell__value}>{order.paymentMethod}</div>
              </div>
              <div className={styles.cell}>
                <div className={styles.cell__label}>Subtotal:</div>
                <div className={styles.cell__value}>{toFixedFunc(order.orderTotal - order.platformFee)}</div>
              </div>
              <div className={styles.cell}>
                <div className={styles.cell__label}>Platform Fee:</div>
                <div className={styles.cell__value}>${toFixedFunc(order.platformFee)}</div>
              </div>
              <div className={styles.cell}>
                <div className={styles.cell__label}>Transaction Date:</div>
                <div className={styles.cell__value}>{formattedDateString}</div>
              </div>
            </div>

            <div className={styles.firstBlock}>
              <div className={styles.cell}>
                <div className={styles.cell__label}>First Name:</div>
                <div className={styles.cell__value}>{order.User.firstName}</div>
              </div>
              <div className={styles.cell}>
                <div className={styles.cell__label}>Last Name:</div>
                <div className={styles.cell__value}>{order.User.lastName}</div>
              </div>
              <div className={styles.cell}>
                <div className={styles.cell__label}>Phone:</div>
                <div className={styles.cell__value}>{order.User.phone}</div>
              </div>
              <div className={styles.cell}>
                <div className={styles.cell__label}>Country:</div>
                <div className={styles.cell__value}>{order.User.countryRegion}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderInfo;
