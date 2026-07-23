import Form from "next/form";
import { usePathname, useRouter } from "next/navigation";
import { useBrowser } from "./ModelsBrowserContext";

function SearchForm({ search }: { search?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const { startTransition } = useBrowser();

  function handleSearch(formData: FormData) {
    const search = formData.get("search")?.toString().trim() || "";
    const url = search ? `${pathname}?search=${encodeURI(search)}` : pathname;
    startTransition(() => {
      router.push(url);
    });
  }

  return (
    <Form action={handleSearch} className="w-full md:w-auto">
      <input
        id="search"
        name="search"
        defaultValue={search}
        autoComplete="off"
        className="w-full rounded-full border border-black py-1.5 px-4 placeholder:text-black"
        placeholder="Search for a model"
      ></input>
    </Form>
  );
}

export default SearchForm;
