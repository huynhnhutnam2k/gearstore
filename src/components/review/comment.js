import { Button } from "components/button";
import Field from "components/field/field";
import { Input } from "components/input";
import { Label } from "components/label";
import React from "react";
import { useForm } from "react-hook-form";

const Comment = () => {
  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });
  const handleComment = async (values) => {};
  return (
    <div className="flex flex-col items-stretch w-full">
      <form
        action=""
        className="mb-4 pb-4 border-b border-b-[#ccc]"
        onSubmit={handleSubmit(handleComment)}
      >
        <div className="flex gap-x-2">
          <div className="">Huynh Nhut Nam</div>
          {/* <div className="">name</div> */}
        </div>
        <div className="my-4">
          <select name="" id="" className="outline-none border rounded-md">
            <option value="">Select...</option>
            <option value="1">1 - Rất tệ</option>
            <option value="2">2 - Tệ</option>
            <option value="3">3 - Bình thường</option>
            <option value="4">4 - Tốt</option>
            <option value="5">5 - Rất tốt</option>
          </select>
        </div>
        <Field>
          <Label>Bình luận</Label>
          <Input
            name="comment"
            control={control}
            placeholder="Thêm bình luận"
          ></Input>
        </Field>
        <Button style={{ width: "300px" }}>Đăng bình luận</Button>
      </form>
    </div>
  );
};

export default Comment;
