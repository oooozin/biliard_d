import { Grid, InputLabel, OutlinedInput, Stack, Paper } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paymentService } from "../paymentService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { paymentPayload } from "../paymentPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';

export const PaymentUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(paymentPayload.update);
  const { payment } = useSelector(state => state.payment);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitPayment = async () => {
    setLoading(true);
    const formData = formBuilder(payload, paymentPayload.update);
    const response = await paymentService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.payment);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await paymentService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (payment) {
      const updatePayload = { ...payment }
      updatePayload.file_path = null;
      setPayload(updatePayload);
    }
  }, [payment])

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
                  placeholder="Enter Payment Name"
                />
                <ValidationMessage field={"name"} />
              </Stack>
            </Grid>

            <FormMainAction
              cancel="Cancle"
              cancelClick={() => navigate(paths.payment)}
              submit="Update"
              submitClick={submitPayment}
              loading={loading}
            />
          </Grid>
        </Paper>
      </div>
    </>
  );
};
