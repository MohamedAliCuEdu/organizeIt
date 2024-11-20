import { useNavigate } from "react-router";

function handleNavigateBack() {
  const navigate = useNavigate();
  return navigate(-1);
}

export default handleNavigateBack;
