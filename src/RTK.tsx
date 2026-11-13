
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { addUser, deleteUser, userData } from "./Store/RTK";

function RTK() {
    let dispatch = useDispatch();

    let { data, loading, error } = useSelector((state) => state.users);

    let { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        dispatch(userData());
    }, []);

    async function onSubmit(user) {
        await dispatch(addUser(user));
        reset();
    }

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error}</h1>;

    return (
        <div>
            <h1>Users</h1>

            {/* ADD FORM */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    placeholder="Name"
                    {...register("name", { required: true })}
                />

                <input
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                />

                <button type="submit">ADD USER</button>
            </form>

            {/* GET USERS */}
            {data.map((user) => (
                <div key={user.id}>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>

                    <button onClick={() => dispatch(deleteUser(user.id))}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default RTK;
