import "./App.css";
import * as React from "react";

function App() {
  const [applyIframe, setApplyIframe] = React.useState(false);
  const [setting, setSetting] = React.useState({
    limit: 10,
    cardDirection: "horizontal",
    layout: "grid",
    domain: "",
    link: "",
    webKey: "",
    category: "",
  });
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/categories`
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchCategories();
  }, []);

  React.useEffect(() => {
    setSetting((prev) => ({
      ...prev,
      link: `${setting.domain}?layout=${setting.layout}&${
        setting.layout === "single"
          ? `cardDirection=${setting.cardDirection}`
          : `limit=${setting.limit}`
      }&webKey=${setting.webKey}${
        setting.category !== "" ? `&category=${setting.category}` : ""
      }`,
    }));
  }, [
    setting.limit,
    setting.cardDirection,
    setting.domain,
    setting.layout,
    setting.webKey,
    setting.category,
  ]);

  return (
    <div className="">
      <header className="header">Web A</header>
      <main className="container1">
        <h1>Day la noi dung web A</h1>
        <p>
          Day la noi dung web A Day la noi dung web A Day la noi dung web A Day
          la noi dung web A Day la noi dung web A Day la noi dung web A Day la
          noi dung web A Day la noi dung web A{" "}
        </p>
        <div className="mt-10">
          {applyIframe ? (
            <iframe
              className="border w-full min-h-[530px] h-full overflow-auto shadow-inner"
              src={setting.link}
            ></iframe>
          ) : (
            <div className="w-full flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <section className="">
                  <div className="w-full p-4 flex flex-col gap-4">
                    <h5 className="font-bold">Setting</h5>
                    <div className="flex md:flex-row flex-col gap-4 items-center">
                      <input
                        value={setting.domain}
                        onChange={(e) =>
                          setSetting((prev) => ({
                            ...prev,
                            domain: e.target.value,
                          }))
                        }
                        placeholder="domain"
                        className="border bg-slate-100"
                      />
                      <input
                        value={setting.webKey}
                        onChange={(e) =>
                          setSetting((prev) => ({
                            ...prev,
                            webKey: e.target.value,
                          }))
                        }
                        placeholder="web-key"
                        className="border bg-slate-100"
                      />
                    </div>
                    <div>
                      <label>
                        Category: 
                        <select
                          className="ml-2"
                          value={setting.category}
                          onChange={(e) =>
                            setSetting((prev) => ({
                              ...prev,
                              category: e.target.value,
                            }))
                          }
                        >
                          {[{slug: '', name: 'None'}, ...categories].map((category, idx) => (
                            <option key={idx} value={category.slug}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="flex md:flex-row flex-col gap-4">
                      <select
                        value={setting.layout}
                        onChange={(e) =>
                          setSetting((prev) => ({
                            ...prev,
                            layout: e.target.value,
                          }))
                        }
                      >
                        <option disabled>Chon loai layout</option>
                        <option
                          value={"single"}
                          className={`${
                            setting.layout === "single" ? "font-bold" : ""
                          }`}
                        >
                          Single
                        </option>
                        <option
                          value={"list"}
                          className={`${
                            setting.layout === "list" ? "font-bold" : ""
                          }`}
                        >
                          List
                        </option>
                        <option
                          value={"grid"}
                          className={`${
                            setting.layout === "grid" ? "font-bold" : ""
                          }`}
                        >
                          Grid
                        </option>
                      </select>
                      {setting.layout === "single" && (
                        <select
                          value={setting.cardDirection}
                          onChange={(e) =>
                            setSetting((prev) => ({
                              ...prev,
                              cardDirection: e.target.value,
                            }))
                          }
                        >
                          <option disabled>Chon chieu card</option>
                          <option
                            value={"horizontal"}
                            className={`${
                              setting.cardDirection === "horizontal"
                                ? "font-bold"
                                : ""
                            }`}
                          >
                            Horizontal
                          </option>
                          <option
                            value={"vertical"}
                            className={`${
                              setting.cardDirection === "vertical"
                                ? "font-bold"
                                : ""
                            }`}
                          >
                            Vertical
                          </option>
                        </select>
                      )}
                    </div>
                    <div className="flex md:flex-row flex-col gap-4">
                      {setting.layout !== "single" && (
                        <div className="relative">
                          <input
                            type="number"
                            value={setting.limit}
                            onChange={(e) =>
                              setSetting((prev) => ({
                                ...prev,
                                limit: +e.target.value,
                              }))
                            }
                            placeholder="limit"
                            className="border bg-slate-100"
                          />
                          <div className="text-xs bg-[#efefef] absolute right-1 top-1/2 -translate-y-1/2">
                            items
                          </div>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => {
                        if (
                          setting.webKey.trim() === "" ||
                          setting.domain.trim() === ""
                        ) {
                          alert("Please input web-key and domain");
                          return;
                        }
                        setApplyIframe(true);
                      }}
                      className="border rounded-sm w-fit p-2 hover:bg-slate-100"
                    >
                      Confirm
                    </button>
                  </div>
                </section>
              </div>
              <div>
                <strong>Your link iframe: </strong>
                <span className="italic">{setting.link}</span>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="footer">Day la footer</footer>
    </div>
  );
}

export default App;
