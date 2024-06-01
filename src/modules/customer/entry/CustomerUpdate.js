import { Grid, InputLabel, OutlinedInput, Stack, Paper } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { customerService } from "../customerService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { customerPayload } from "../customerPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';

export const CustomerUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(customerPayload.update);
  const { customer } = useSelector(state => state.customer);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitCustomer = async () => {
    setLoading(true);
    const formData = formBuilder(payload, customerPayload.update);
    const response = await customerService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.customer);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await customerService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (customer) {
      const updatePayload = { ...customer }
      updatePayload.file_path = null;
      setPayload(updatePayload);
    }
  }, [customer])

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
                  placeholder="Enter Customer Name"
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
                  placeholder="Enter Customer Phone"
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
                  placeholder="Enter Customer Address"
                />
                <ValidationMessage field={"address"} />
              </Stack>
            </Grid>

            <FormMainAction
              cancel="Cancle"
              cancelClick={() => navigate(paths.customer)}
              submit="Update"
              submitClick={submitCustomer}
              loading={loading}
            />
          </Grid>
        </Paper>
      </div>
    </>
  );
};
