import { Grid, InputLabel, OutlinedInput, Stack, Paper, MenuItem, Select } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { itemService } from "../itemService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { itemPayload } from "../itemPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Profile } from '../../../shares/Profile';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';
import { ProfileImage } from '../../../shares/ProfileImage';

export const ItemUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(itemPayload.update);
  const [categorys, setCategorys] = useState([]);
  const { item } = useSelector(state => state.item);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitItem = async () => {
    setLoading(true);
    const formData = formBuilder(payload, itemPayload.update);
    const response = await itemService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.item);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await itemService.show(dispatch, params.id);

    const categoryResult = await getRequest(`${endpoints.category}`);
    if (categoryResult.status === 200) {
      setCategorys(categoryResult.data);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (item) {
      const updatePayload = { ...item }
      setPayload(updatePayload);
    }
  }, [item])

  return (
    <>
      <div className=" grid">
        <div className="col-12">
          <Breadcrumb />
        </div>

        <Paper elevation={3} style={{ padding: 20, margin: 10 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <Stack
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <ProfileImage
                            preview={payload.image ? payload.image : null}
                            onSelect={(e) => payloadHandler(payload, e, 'image', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"image"} />
                    </Stack>
                </Grid>
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
                            placeholder="Enter Item Name"
                        />
                        <ValidationMessage field={"name"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel >
                            Price (required)
                        </InputLabel>
                        <OutlinedInput
                            type="number"
                            value={payload.price ? payload.price : ""}
                            onChange={(e) =>
                                payloadHandler(
                                    payload,
                                    e.target.value,
                                    "price",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                )
                            }
                            name="price"
                            placeholder="Enter Item Price"
                        />
                        <ValidationMessage field={"price"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel >
                            Purchase Price (required)
                        </InputLabel>
                        <OutlinedInput
                            type="number"
                            value={payload.purchase_price ? payload.purchase_price : ""}
                            onChange={(e) =>
                                payloadHandler(
                                    payload,
                                    e.target.value,
                                    "purchase_price",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                )
                            }
                            name="purchase_price"
                            placeholder="Enter Item Purchase Price"
                        />
                        <ValidationMessage field={"purchase_price"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel >
                            Bar Code
                        </InputLabel>
                        <OutlinedInput
                            type="number"
                            value={payload.barcode ? payload.barcode : ""}
                            onChange={(e) =>
                                payloadHandler(
                                    payload,
                                    e.target.value,
                                    "barcode",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                )
                            }
                            name="barcode"
                            placeholder="Enter Item Bar Code"
                        />
                        <ValidationMessage field={"barcode"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel > Choose Category (required) </InputLabel>
                        <Select
                        id="category_id"
                        value={payload.category_id ? payload.category_id : ""}
                        onChange={(e) =>
                            payloadHandler(
                            payload,
                            e.target.value,
                            "category_id",
                            (updateValue) => {
                                setPayload(updateValue);
                            }
                            )}
                        name="category_id"
                        >
                        { categorys.map((value, index) => {
                            return (
                            <MenuItem key={`category_id${index}`} value={value.id}> {value.name} </MenuItem>
                            )
                        })}
                        </Select>
                        <ValidationMessage field={"category_id"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel >Status (required)</InputLabel>
                        <Select
                            id="status"
                            value={payload.status ? payload.status : ""}
                            onChange={(e) =>
                            payloadHandler(
                                payload,
                                e.target.value,
                                "status",
                                (updateValue) => {
                                setPayload(updateValue);
                                }
                            )}
                            name="status"
                        >
                            <MenuItem value="ACTIVE">Active</MenuItem>
                            <MenuItem value="INACTIVE">Inactive</MenuItem>
                        </Select>
                        <ValidationMessage field={"status"} />
                    </Stack>
                </Grid>

                <FormMainAction
                    cancel="Cancle"
                    cancelClick={() => navigate(paths.item)}
                    submit="Update"
                    submitClick={submitItem}
                    loading={loading}
                />
            </Grid>
        </Paper>
      </div>
    </>
  );
};
