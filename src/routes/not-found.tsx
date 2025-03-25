import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <main className="w-full container relative h-screen mx-auto max-w-[90%] flex items-center justify-center">
      <div className="absolute top-0 right-0 w-[200px] h-[100px] bg-gradient-to-b from-primary to-primary/90 blur-[8rem]"></div>
      <div className="space-y-6 text-center">
        <h1 className=" inter-tight-500 text-9xl bg-gradient-to-r from-primary to-primary/80 text-transparent bg-clip-text ">
          404
        </h1>
        <p className="text-center">
          Oops! this page doesn't exist or still under construction
        </p>
        <br />
        <Link
          className="text-primary underline underline-offset-8 inter-600"
          to={"/"}
        >
          Go back to store
        </Link>
      </div>
    </main>
  );
};
