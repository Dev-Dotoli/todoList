import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {deleteBucket} from "./redux/modules/bucket";

const Detail = (props) => {
const dispatch = useDispatch();
const history = useHistory();
const params = useParams();
const bucket_index = params.index;

const bucket_list = useSelector((state) => state.bucket.list);
let bucket_index = parseInt(props.match.params.index);

return (
<div>
<h1>{bucket_list[bucket_index]}</h1>
<button
onClick={() => {
console.log("삭제하기 버튼을 눌렀어!");
dispatch(deleteBucket(bucket_index));
history.goBack();
}}
>
삭제하기
</button>
</div>
);
};

export default Detail;