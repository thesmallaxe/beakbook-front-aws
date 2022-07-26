import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  BarnAnalysis,
  AverageWeight,
  StandardDeviation,
  TotalActivity,
  CycleSelection,
} from ".";
import { ShimmerThumbnail } from "react-shimmer-effects";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateBarnOrder } from "../../../app/slices/BarnOrderSlice";

export const BarnGraphContainer = (props) => {
  const { graphs, graph_status } = props;
  const { sort_order, user } = props.props;
  const dispatch = useDispatch();
  const [barnOrder, setBarnOrder] = useState(sort_order ?? {});

  const getStyle = (style, snapshot) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }

    // patching the existing style
    return {
      ...style,
      transition: `all 0.5s ease`,
    };
  };

  const handleGraphDragEnd = (result) => {
    // return null if drop the element outside the container
    if (!result.destination) return;

    // Reorder the array
    const items = Array.from(barnOrder.section_2);
    const [reOrderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reOrderedItem);

    // Update the backend
    let updateOrder = {
      plugin_order: { ...barnOrder, section_2: items },
      user_id: user.id,
    };
    dispatch(updateBarnOrder(updateOrder));

    // Update the current state
    setBarnOrder(updateOrder.plugin_order);
  };

  useEffect(() => {
    setBarnOrder(sort_order);
  }, [sort_order]);
  return (
    <DragDropContext onDragEnd={handleGraphDragEnd}>
      <Droppable droppableId="droppable-graph">
        {(provided) => (
          <div
            className="barn_details__graphs"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {window.innerWidth <= 768 && (
              <div className="barn_details__links">
                <button
                  className="btn btn--link"
                  onClick={() => props.showNewCycle()}
                >
                  Add new cycle
                </button>
                <button
                  className="btn btn--link btn--black"
                  onClick={() => props.showNewMotality()}
                >
                  Add mortality count
                </button>
              </div>
            )}
            <CycleSelection
              user={props.user}
              cycle={props.props}
              download={props.download}
            />
            {props.length === 0 && (
              <div>
                <ShimmerThumbnail height={300} rounded />
                <ShimmerThumbnail height={300} rounded />
                <ShimmerThumbnail height={300} rounded />
              </div>
            )}
            {window.innerWidth < 768 && (
              <BarnAnalysis
                loading={props.loading}
                analysis={props.barnAnalysis}
              />
            )}

            {Boolean(Object.values(graphs).length) &&
              barnOrder?.section_2 &&
              // eslint-disable-next-line array-callback-return
              barnOrder?.section_2.map((item, key) => {
                let graph = graphs[item];
                if (item === "average_weight") {
                  return (
                    graph &&
                    graph_status &&
                    (graph_status[0]?.value === 1 ||
                      graph_status[0]?.value === "1") && (
                      <Draggable draggableId={item} index={key} key={item}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getStyle(
                              provided.draggableProps.style,
                              snapshot
                            )}
                          >
                            <AverageWeight
                              graph={graph}
                              loading={props.loading}
                              average_weight={props.average_weight}
                              handleEvent={props.handleAverageWeight}
                              key={key}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                  );
                } else if (item === "total_activity") {
                  return (
                    graph &&
                    graph_status &&
                    (graph_status[1]?.value === 1 ||
                      graph_status[1]?.value === "1") && (
                      <Draggable draggableId={item} index={key} key={item}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getStyle(
                              provided.draggableProps.style,
                              snapshot
                            )}
                          >
                            <TotalActivity
                              graph={graph}
                              loading={props.loading}
                              key={key}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                  );
                } else if (item === "standard_deviation") {
                  return (
                    graph &&
                    graph_status &&
                    (graph_status[2]?.value === 1 ||
                      graph_status[2]?.value === "1") && (
                      <Draggable draggableId={item} index={key} key={item}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getStyle(
                              provided.draggableProps.style,
                              snapshot
                            )}
                          >
                            <StandardDeviation
                              graph={graph}
                              loading={props.loading}
                              key={key}
                            />
                          </div>
                        )}
                      </Draggable>
                    )
                  );
                } else {
                  return <></>;
                }
              })}
            {provided.placeholder}
            {props.children}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
