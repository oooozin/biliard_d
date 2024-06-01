import { Grid, InputLabel, OutlinedInput, Stack, Paper, MenuItem, Select } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { billService } from "../billService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { billPayload } from "../billPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Profile } from '../../../shares/Profile';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';

export const BillUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(billPayload.update);
  const [shops, setShops] = useState([]);
  const { bill } = useSelector(state => state.bill);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitBill = async () => {
    setLoading(true);
    const formData = formBuilder(payload, billPayload.update);
    const response = await billService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.bill);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await billService.show(dispatch, params.id);

    const shopResult = await getRequest(`${endpoints.shop}`);
    if (shopResult.status === 200) {
      setShops(shopResult.data);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (bill) {
      const updatePayload = { ...bill }
      setPayload(updatePayload);
    }
  }, [bill])

  return (
    <>
      <div className=" grid">
        <div className="col-12">
          <Breadcrumb />
        </div>

        <Paper elevation={3} style={{ padding: 20, margin: 10 }}>
            <Grid container spacing={3}>
                
                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel >
                            Name (required)
                        </InputLabel>
                        <OutlinedInput
                            type="text"
                            value={payload.name ? payload.name : ""}
                            onChange={(e) =>
                                payloadHandler(
                                    payload,
                                    e.target.value,
                                    "name",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                )
                            }
                            name="name"
                            placeholder="Enter Bill Name"
                        />
                        <ValidationMessage field={"name"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel >
                            Amount 
                        </InputLabel>
                        <OutlinedInput
                            type="number"
                            value={payload.amount ? payload.amount : ""}
                            onChange={(e) =>
                                payloadHandler(
                                    payload,
                                    e.target.value,
                                    "amount",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                )
                            }
                            name="amount"
                            placeholder="Enter Bill Amount"
                        />
                        <ValidationMessage field={"amount"} />
                    </Stack>
                </Grid>


                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel > Choose Shop (required) </InputLabel>
                        <Select
                        id="shop_id"
                        value={payload.shop_id ? payload.shop_id : ""}
                        onChange={(e) =>
                            payloadHandler(
                            payload,
                            e.target.value,
                            "shop_id",
                            (updateValue) => {
                                setPayload(updateValue);
                            }
                            )}
                        name="shop_id"
                        >
                        { shops.map((value, index) => {
                            return (
                            <MenuItem key={`shop_id${index}`} value={value.id}> {value.name} </MenuItem>
                            )
                        })}
                        </Select>
                        <ValidationMessage field={"shop_id"} />
                    </Stack>
                </Grid>


                <FormMainAction
                    cancel="Cancle"
                    cancelClick={() => navigate(paths.bill)}
                    submit="Update"
                    submitClick={submitBill}
                    loading={loading}
                />
            </Grid>
        </Paper>
      </div>
    </>
  );
};
