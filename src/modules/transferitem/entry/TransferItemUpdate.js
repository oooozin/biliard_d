import { Grid, InputLabel, OutlinedInput, Stack, Paper, MenuItem, Select } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { transferItemService } from "../transferItemService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { transferItemPayload } from "../transferItemPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';

export const TransferItemUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(transferItemPayload.update);
  const [items, setItems] = useState([]);
  const [shops, setShops] = useState([]);
  const { transferItem } = useSelector(state => state.transferItem);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitTransferItem = async () => {
    setLoading(true);
    const formData = formBuilder(payload, transferItemPayload.update);
    const response = await transferItemService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.transferItem);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await transferItemService.show(dispatch, params.id);

    const itemResult = await getRequest(`${endpoints.item}`);
    if (itemResult.status === 200) {
        setItems(itemResult.data);
    }
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
    if (transferItem) {
      const updatePayload = { ...transferItem }
      setPayload(updatePayload);
    }
  }, [transferItem])

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
                        <InputLabel > Choose Shop (required) </InputLabel>
                        <Select
                        id="from_shop"
                        value={payload.from_shop ? payload.from_shop : ""}
                        onChange={(e) =>
                            payloadHandler(
                            payload,
                            e.target.value,
                            "from_shop",
                            (updateValue) => {
                                setPayload(updateValue);
                            }
                            )}
                        name="from_shop"
                        >
                        { shops.map((value, index) => {
                            return (
                            <MenuItem key={`from_shop${index}`} value={value.id}> {value.name} </MenuItem>
                            )
                        })}
                        </Select>
                        <ValidationMessage field={"from_shop"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel > Choose Shop (required) </InputLabel>
                        <Select
                        id="to_shop"
                        value={payload.to_shop ? payload.to_shop : ""}
                        onChange={(e) =>
                            payloadHandler(
                            payload,
                            e.target.value,
                            "to_shop",
                            (updateValue) => {
                                setPayload(updateValue);
                            }
                            )}
                        name="to_shop"
                        >
                        { shops.map((value, index) => {
                            return (
                            <MenuItem key={`to_shop${index}`} value={value.id}> {value.name} </MenuItem>
                            )
                        })}
                        </Select>
                        <ValidationMessage field={"to_shop"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel > Choose Item (required) </InputLabel>
                        <Select
                        id="item_id"
                        value={payload.item_id ? payload.item_id : ""}
                        onChange={(e) =>
                            payloadHandler(
                            payload,
                            e.target.value,
                            "item_id",
                            (updateValue) => {
                                setPayload(updateValue);
                            }
                            )}
                        name="item_id"
                        >
                        { items.map((value, index) => {
                            return (
                            <MenuItem key={`item_id${index}`} value={value.id}> {value.name} </MenuItem>
                            )
                        })}
                        </Select>
                        <ValidationMessage field={"item_id"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel >
                            Qty (required)
                        </InputLabel>
                        <OutlinedInput
                            type="number"
                            value={payload.qty ? payload.qty : ""}
                            onChange={(e) =>
                                payloadHandler(
                                    payload,
                                    e.target.value,
                                    "qty",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                )
                            }
                            name="qty"
                            placeholder="Enter TransferItem Qty"
                        />
                        <ValidationMessage field={"qty"} />
                    </Stack>
                </Grid>

                <FormMainAction
                    cancel="Cancle"
                    cancelClick={() => navigate(paths.transferItem)}
                    submit="Update"
                    submitClick={submitTransferItem}
                    loading={loading}
                />
            </Grid>
        </Paper>
      </div>
    </>
  );
};
