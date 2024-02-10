import React, { useState, useEffect, useRef } from 'react';
import styles from '../styles/admin-pannel.module.scss';
import OrderInfo from './OrderInfo';
import FilterInput from './FilterInput';
import { IOrderData } from '@/models/paymentInfo/IOrderRecievedData';
import axios from 'axios';
import Image from 'next/image';
import Logout from '@/modules/Login/components/Logout';
import { useSession } from 'next-auth/react';

const OrderList: React.FC = () => {
  const [ordersData, setConvertedObject] = useState<IOrderData[]>([]);
  const [searchByEmailValue, setSearchByEmailValue] = useState<string>('');
  const [searchByOrderIdValue, setSearchByOrderIdValue] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<IOrderData[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { data: session } = useSession();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalItems: 1,
    limit: 10,
  })
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getData = async (page: number) => {
    try{
      setLoading(true);
      const response = await axios.get<{rows: IOrderData[]; count: number}>(`https://designshare.net/designsharebackendapp/quickProject/payments?page=${page}&limit=10`);
      setConvertedObject(response.data.rows)
      setPagination(cPagination => ({...cPagination, currentPage: page, totalItems: response.data.count}))
    } catch(err){
       console.log('err', err);
    } finally {
      setLoading(false);
    }
  }

  const getDataByEmail = async (page: number, email: string) => {
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current);
    }
    setSearchByOrderIdValue('');
    setLoading(true);
      timeoutRef.current = setTimeout(async () => {
        try {
          const response = await axios.get<{rows: IOrderData[]; count: number}>(`https://designshare.net/designsharebackendapp/quickProject/payments/paymentsByEmail?email=${email.trim()}&page=${page}&limit=10`);
          setConvertedObject(response.data.rows)
          setPagination(cPagination => ({...cPagination, currentPage: page, totalItems: response.data.count === 0 ? 1 : response.data.count}))
        } catch (err) {
          console.log('err', err);
        } finally {
          setLoading(false);
        }
      }, 500);
  }

  const getDataByOrderId = async (page: number, orderId: string) => {
    setSearchByEmailValue('');
    setLoading(true);
    if(timeoutRef.current){
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
        try {
          const response = await axios.get<{data: IOrderData}>(`https://designshare.net/designsharebackendapp/quickProject/payments/paymentsByOrderId?orderId=${orderId.trim()}`);
      setConvertedObject(response.data?.data ? [response.data.data] : [])
      setPagination(cPagination => ({...cPagination, totalItems: 1, currentPage: 1}))
        } catch (err) {
          console.log('err', err);
        } finally {
          setLoading(false);
        }
      }, 500);



  }

  useEffect(() => {
    return () => {
      if(timeoutRef.current){
        clearTimeout(timeoutRef.current)
      }
     };
  }, []);

  useEffect(() => {
    getData(pagination.currentPage)
  }, [])

  useEffect(() => {
    setFilteredItems(ordersData);
  }, [ordersData])

  const pagButtons = [];
  for (let i = 1; i <= Math.ceil(pagination.totalItems / pagination.limit); i++) {
    pagButtons.push(i);
  }
  const paginate = (pageNum: number) =>{
    setPagination(cPagination => ({...cPagination, currentPage: pageNum}))
    if(searchByEmailValue){
      getDataByEmail(pageNum, searchByEmailValue);
    } else {
      getData(pageNum)
    }
  };
  const nextPage = () => {
    if (pagination.currentPage === pagButtons.length) {
      return;
    }
    if(searchByEmailValue){
      getDataByEmail(pagination.currentPage + 1, searchByEmailValue);
    } else {
      getData(pagination.currentPage + 1)
    }
    setPagination(cPagination => ({...cPagination, currentPage: pagination.currentPage + 1}))
  };
  const prevPage = () => {
    if (pagination.currentPage === 1) {
      return;
    }
    if(searchByEmailValue){
      getDataByEmail(pagination.currentPage - 1, searchByEmailValue);
    } else {
      getData(pagination.currentPage - 1)
    }
    setPagination(cPagination => ({...cPagination, currentPage: pagination.currentPage - 1}))
  };

  return (
    <>
        <section className={styles.section}>
          <div>
          <h1 className={styles.title}>Admin Pannel</h1>
          <div style={{display: 'flex', justifyContent: 'flex-end', margin: '10px'}}>
          <Logout email={session?.user?.email} />
          </div>
          </div>
          <div className={styles.divider}></div>
          <div className={styles.tools}>
            <FilterInput placeholder="Sort by Email" searchValue={searchByEmailValue} setSearchValue={(val) => {
              setSearchByEmailValue(val.toLowerCase());
              if(!val){
                getData(1);
              } else {
                getDataByEmail(1, val.toLowerCase());
              }

            }} />
            <FilterInput placeholder="Sort by Order Id" searchValue={searchByOrderIdValue} setSearchValue={(val) => {
              setSearchByOrderIdValue(val.toLowerCase());
              if(!val) {
                getData(1);
              } else {
                getDataByOrderId(1, val.toLowerCase());
              }
            }}  />
          </div>
          <div className={styles.divider}></div>

          <div className={styles.items}>
          { isLoading && <div className={styles.loaderOverlay}>
          <Image
            priority
            width={130}
            height={130}
            src={'/assets/preloader/preloader.gif'}
            alt="preloader"
          />
        </div>}
            {filteredItems?.map((el, index) => (
              <OrderInfo order={el} key={index} />
            ))}
          </div>
          <div className={styles.pagination}>
            {pagButtons.map((el) => (
              <button style={{ color: el === pagination.currentPage ? 'blue': ''}} onClick={() => paginate(el)} key={el} className={styles.pagButton}>
                {el}
              </button>
            ))}
          </div>
          <div className={styles.nextPrev}>
            <button onClick={prevPage} className={styles.nextPrev__button}>
              Prev
            </button>
            <button onClick={nextPage} className={styles.nextPrev__button}>
              Next
            </button>
          </div>
        </section>
    </>
  );
};
export default OrderList;
