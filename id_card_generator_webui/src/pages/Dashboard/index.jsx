import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Browser, LOCAL_STORAGE_KEY } from "../../constants";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (token) return;
    navigate(Browser.ROOT);
  }, []);

  return <></>;
}
