import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { BarnAnalysis, BarnOverview, CycleDetails } from ".";
import { useDispatch } from "react-redux";
import { updateBarnOrder } from "../../../app/slices/BarnOrderSlice";
import { ShimmerCategoryList } from "react-shimmer-effects";

export const BarnDetailContainer = (props) => {
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

  const handleBarnDragEnd = (result) => {
    // return null if drop the element outside the container
    if (!result.destination) return;

    // Reorder the array
    const items = Array.from(barnOrder.section_1);
    const [reOrderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reOrderedItem);

    // Update the backend
    let updateOrder = {
      plugin_order: { ...barnOrder, section_1: items },
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
    <DragDropContext onDragEnd={handleBarnDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className="barn_details__actions">
              {props.loading && (
                <>
                  <ShimmerCategoryList
                    title
                    items={4}
                    categoryStyle="STYLE_FOUR"
                  />
                  <ShimmerCategoryList
                    title
                    items={4}
                    categoryStyle="STYLE_FOUR"
                  />
                  <ShimmerCategoryList
                    title
                    items={4}
                    categoryStyle="STYLE_FOUR"
                  />
                </>
              )}
              {barnOrder?.section_1 && // eslint-disable-next-line array-callback-return
                barnOrder?.section_1.map((item, index) => {
                  if (item === "barn_analysis") {
                    return (
                      window.innerWidth >= 768 && (
                        <Draggable draggableId={item} index={index} key={item}>
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
                              <BarnAnalysis
                                loading={props.loading}
                                analysis={props.barnAnalysis}
                              />
                            </div>
                          )}
                        </Draggable>
                      )
                    );
                  } else if (item === "barn_overview") {
                    return (
                      <Draggable draggableId={item} index={index} key={item}>
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
                            <BarnOverview barn={props.props} />
                          </div>
                        )}
                      </Draggable>
                    );
                  } else if (item === "cycle_details") {
                    return (
                      <Draggable draggableId={item} index={index} key={item}>
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
                            <CycleDetails cycle={props.props} />
                          </div>
                        )}
                      </Draggable>
                    );
                  }
                })}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
