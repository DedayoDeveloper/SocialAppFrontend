import React from "react";
import { Route, Redirect } from "react-router-dom";


export function RouteGuard(props) {
  
  const { loading, isAuth } = props;
  if (loading) {
    return <Loading />;
  }

  if (isAuth) {
    return <Route path={props.path} component={props.component} />;
  }

  if (!isAuth && !loading) {
    return (
      <Redirect
        to={{
          pathname: "/login",
        }}
      />
    );
  }
}

export function Loading(props) {
  return (
    <main className="section">
      <section className="container">
        <div className="columns is-vcentered is-big">
          <div className="column is-fullwidth is-offset-1">
            <div className="text-center">
              {props.children ? (
                props.children
              ) : (
                <React.Fragment>
                  
                  <h2 className="is-size-4">Initiating Sequence. . .</h2>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
