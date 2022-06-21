export const Widget = (props) => {
  let action = props.widget_action ? true : false;
  let element =
    action && props.widget_action.edit ? props.widget_action.child : "";
  
  return (
    <div className="widget barn_analysis">
      <div className="widget__title">
        <h3>
          <i className="icon icon-grid"></i> {props.title}
        </h3>
        {element}
      </div>
      <div className="widget__body">{props.children}</div>
    </div>
  );
};
