import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate, useNavigationType, type Location } from "react-router";
import { HomePage } from "@/pages/home";
import { OrderPage } from "@/pages/order";
import { TourPage } from "@/pages/tour";
import { NotFoundPage } from "@/pages/not-found";

export default function AppRouter() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigationType = useNavigationType();
  const [initialKey] = useState(location.key);
  const state = location.state as { backgroundLocation?: Location } | null;
  const background = location.key !== initialKey ? state?.backgroundLocation : undefined;

  useEffect(() => {
    if (background || navigationType === "POP") return;
    if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [background, navigationType, location.pathname, location.hash]);

  return (
    <>
      <Routes location={background ?? location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/map/:name" element={<TourPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {background && (
        <Routes>
          <Route
            path="/order"
            element={
              <OrderPage
                onClose={() => {
                  void navigate(-1);
                }}
              />
            }
          />
          <Route
            path="/map/:name"
            element={
              <TourPage
                onClose={() => {
                  void navigate(-1);
                }}
              />
            }
          />
        </Routes>
      )}
    </>
  );
}
