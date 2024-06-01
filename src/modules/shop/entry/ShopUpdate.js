import { Grid, InputLabel, OutlinedInput, Stack, Paper } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { shopService } from "../shopService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { shopPayload } from "../shopPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';

export const ShopUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(shopPayload.update);
  const { shop } = useSelector(state => state.shop);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitShop = async () => {
    setLoading(true);
    const formData = formBuilder(payload, shopPayload.update);
    const response = await shopService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.shop);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await shopService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (shop) {
      const updatePayload = { ...shop }    
      setPayload(updatePayload);
    }
  }, [shop])  

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
                <InputLabel > Name </InputLabel>
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
                  placeholder="Enter Shop Name"
                />
                <ValidationMessage field={"name"} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <InputLabel >Phone </InputLabel>
                <OutlinedInput
                  type="number"
                  value={payload.phone ? payload.phone : ""}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "phone",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  name="phone"
                  placeholder="Enter Shop Phone"
                />
                <ValidationMessage field={"phone"} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <InputLabel > Address </InputLabel>
                <OutlinedInput
                  type="text"
                  value={payload.address ? payload.address : ""}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "address",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  name="address"
                  placeholder="Enter Shop Address"
                />
                <ValidationMessage field={"address"} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <InputLabel > Open Time </InputLabel>
                <OutlinedInput
                  type="time"
                  value={payload.open_time ? payload.open_time : ""}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "open_time",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  name="open_time"
                  placeholder="Enter Shop Open Time"
                />
                <ValidationMessage field={"open_time"} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <InputLabel > Close Time </InputLabel>
                <OutlinedInput
                  type="time"
                  value={payload.close_time ? payload.close_time : ""}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "close_time",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  name="close_time"
                  placeholder="Enter Shop Close Time"
                />
                <ValidationMessage field={"close_time"} />
              </Stack>
            </Grid>

            <FormMainAction
              cancel="Cancle"
              cancelClick={() => navigate(paths.shop)}
              submit="Update"
              submitClick={submitShop}
              loading={loading}
            />
          </Grid>
        </Paper>
      </div>
    </>
  );
};
