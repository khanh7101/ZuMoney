import { useRouter } from "next/router";
import { ROUTES } from "@nav/routes";
import { CloseIcon } from "@ui/setting-icons";

type Props = {
  title: string;
  backTo?: string;       // mặc định quay về /settings
  subtitle?: string;
};

export default function HeaderClose({ title, subtitle, backTo = ROUTES.SETTINGS }: Props) {
  const router = useRouter();
  return (
    <div>
      {/* Dòng 1: nút close */}
      <div className="flex justify-start">
        <button
          aria-label="Đóng"
          onClick={() => router.push(backTo)}
          className="w-8 h-8 "
        >
          <CloseIcon />
        </button>
      </div>

      {/* Dòng 2: tiêu đề */}
      <div className=" mt-2">
        {subtitle && <div className="text-gray-500">{subtitle}</div>}
        <h1 className="mt-2 text-2xl font-bold">{title}</h1>
      </div>
    </div>

  );
}
