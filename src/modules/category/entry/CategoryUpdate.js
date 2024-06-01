import { Grid, InputLabel, OutlinedInput, Stack, Paper, MenuItem, Select } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { categoryService } from "../categoryService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { categoryPayload } from "../categoryPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { Profile } from '../../../shares/Profile';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';

export const CategoryUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(categoryPayload.update);
  const [shops, setShops] = useState([]);
  const { category } = useSelector(state => state.category);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitCategory = async () => {
    setLoading(true);
    const formData = formBuilder(payload, categoryPayload.update);
    const response = await categoryService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.category);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await categoryService.show(dispatch, params.id);

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
    if (category) {
      const updatePayload = { ...category }
      setPayload(updatePayload);
    }
  }, [category])

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
                            placeholder="Enter Category Name"
                        />
                        <ValidationMessage field={"name"} />
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
                    cancelClick={() => navigate(paths.category)}
                    submit="Update"
                    submitClick={submitCategory}
                    loading={loading}
                />
            </Grid>
        </Paper>
      </div>
    </>
  );
};
