import store from "../store";

const withPermission =
  (Component, permission, show_notification) =>
  ({ ...props }) => {
    const permissions = store.getState().user_permissions.permissions;

    const hasAccess =
      permissions.length &&
      permissions.filter((item) => {
        return item.name === permission;
      });

    const Message = () => {
      return show_notification ? (
        <div className="alerts">
          <p>Permission denied. You don't have access for view this component</p>
        </div>
      ) : (
        <></>
      );
    };

    return hasAccess.length ? <Component {...props} /> : <Message />;
  };

const checkPermission = (permission) => {
  const permissions = store.getState().user_permissions.permissions;
  const hasAccess =
    permissions.length &&
    permissions.filter((item) => {
      return item.name === permission;
    });

  return hasAccess.length > 0;
};

export { withPermission, checkPermission };
