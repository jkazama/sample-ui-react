import { Button } from "@/components/elements/button";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@/components/elements/card";

export const Login = () => {
  return (
    <>
      <Card className="m-2">
        <CardHeader>Login Form</CardHeader>
        <CardBody>
          Hello
          <br />
          World
        </CardBody>
        <CardFooter>
          <Button onClick={() => alert("Hello")}>Login</Button>
        </CardFooter>
      </Card>
    </>
  );
};
