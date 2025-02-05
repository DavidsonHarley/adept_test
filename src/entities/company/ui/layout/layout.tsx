import Loader from "../../../../shared/ui/loader/loader";
import cls from "./styles/layout.module.scss";

export function Layout({
  children,
  loader,
  loading,
}: {
  loader: React.RefObject<HTMLDivElement>;
  loading: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={cls.content}>
      {children}
      <div ref={loader}></div>
      <div className={cls.ctnLoader}>{loading && <Loader />}</div>
    </div>
  );
}
