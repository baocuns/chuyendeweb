import * as React from "react";
import { login } from "../../../redux/apiURL";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Login = () => {
  // check user
  const user = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    const user = {
      username: username,
      password: password,
    };
    login(user, dispatch, navigate);
  };

  // useEf
  useEffect(() => {
    user && navigate("/");
  }, []);

  return (
    <div className='h-screen w-full bg-[url("./images/background/background.jpg")] bg-cover bg-center '>
      <div className="container mx-auto">
        <div className="pt-10 sm:pt-24 px-[20%]">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Travel Login
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <form>
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="username"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Username
                        </label>
                        <input
                          type="text"
                          name="username"
                          id="username"
                          autoComplete="username"
                          value={username}
                          onChange={handleChangeUsername}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="password"
                          value={password}
                          onChange={handleChangePassword}
                          className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-6">
                        <div className="flex flex-row">
                          <input
                            type="checkbox"
                            name="remember"
                            id="remember"
                            className="mt-1 rounded border border-gray-300 py-2 px-2 bg-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm appearance-none checked:bg-blue-500 ..."
                          />
                          <label
                            htmlFor="remember"
                            className="block text-sm font-medium text-gray-700 pl-2"
                          >
                            Remember Password
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 text-right sm:px-6">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Login
                    </button>
                  </div>
                  <div className="px-4 py-3 text-right sm:px-6">
                    <Link to={"#"}>Register</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
