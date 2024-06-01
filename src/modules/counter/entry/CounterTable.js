import { Grid, InputLabel, OutlinedInput, Stack, Paper, MenuItem, Select, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { counterService } from "../counterService";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { counterPayload } from "../counterPayload";
import ScrollTab from '../component/ScrollTab';
import CartList from '../component/CartList';
import ItemList from '../component/ItemList';
import CustomTabPanel from '../component/CustomTabPanel';
import { setPaginate } from '../counterSlice';

export const CounterTable = () => {

  const [loading, setLoading] = useState(true);
  const [payload, setPayload] = useState(counterPayload.update);
  const [shopId, setShopId] = useState(null)
  const [value, setValue] = useState(0);

  const { man } = useSelector((state) => state.share );
  const { table, category, items, order, paginateParams, categoryParams } = useSelector(state => state.counter);
  const params = useParams();
 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const loadingData = useCallback(async () => {
    if(Object.keys(man).length !== 0){
      setLoading(true);    
      const cparams = {
        shop_id : man?.shop_id
      }
      await counterService.index(dispatch, cparams);
      const result = await counterService.show(dispatch, params.id);
      if(result.status === 200){
        const request = await counterService.orderlist(dispatch, result?.data?.order_id)
      }
      setLoading(false);
    }
  }, [dispatch, params.id, man]);

  // useEffect(()=>{    
  //   console.log("man",man)
  //   if(Object.keys(man).length !== 0){
  //     setShopId(man.shop_id)
  //   }else{
  //     setLoading(true)
  //   }
  // },[man])

  // useEffect(()=>{
  //   console.log("shop",shopId)
  //   if(shopId !== null){
  //     dispatch(
  //       setPaginate({
  //           ...categoryParams,
  //           shop_id: `${shopId}`,
  //       }))
  //       setLoading(false)
  //   }
  // },[shopId])

  // useEffect(()=>{
  //   console.log("mman",Object.keys(man).length,man)
  //   loadingData()
  // },[man])

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  return (
    <>
      <div className=" grid">
        <div className="col-12">
          <Breadcrumb />
        </div>

            <Typography variant='h6'>{table?.name}</Typography>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} md={12} lg={6}>
                <Paper elevation={3} style={{ margin: 6 }}>
                  <ScrollTab value={value} category={category.filter(item => item.status && item.status === 'ACTIVE')} handleChange={handleChange} />
                  {category.filter(item => item.status && item.status === 'ACTIVE').map((data, index) => (
                      <CustomTabPanel key={index} value={value} index={index}>
                        <ItemList data={data?.items.filter(item => item?.item_data?.qty !== 0)} loading={loading} loadingData={()=>loadingData()}/>
                      </CustomTabPanel>
                    ))
                  }
                </Paper>
                </Grid>
                <Grid item xs={12} md={12} lg={6}>
                  <CartList loadingData={()=>loadingData()}/>
                </Grid>
            </Grid>
        
      </div>
    </>
  );
};
