import React, { useState, useEffect } from "react";
import { updateGrocery as updateGrocery } from "../../api";
import { Grocery, GroceryStatus } from '../../Grocery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { timeAgo, expirationSentence } from '../utilities';
import { LocationNames } from '../../Grocery';

type GroceryListItemProps = {
  grocery: Grocery;
  onClick: (grocery: Grocery) => void;
};

export const GroceryListItem: React.FC<GroceryListItemProps> = (props: GroceryListItemProps) => {
  const [status, setStatus] = useState<GroceryStatus>(props.grocery.status);
  const [statusDate, setStatusDate] = useState<Date | null>(props.grocery.statusDate || null);

  console.log(`GroceryListItem ${props.grocery.name} location: ${LocationNames[props.grocery.location]}`);

  useEffect(() => {
    setStatus(props.grocery.status);
  }, [props.grocery]); 

  const onStatusChange = async (nextStatus: GroceryStatus) => {
    await updateGrocery({ ...props.grocery, status: nextStatus, statusDate: new Date() });

    setStatus(nextStatus);
    setStatusDate(new Date());
  }

  return (
    <div className={`list-item`}>
      <div>
        <p>{props.grocery.name}</p>
        {props.grocery.expirationDate &&
          <p className="expiration">{expirationSentence(props.grocery.expirationDate)}</p>}
          { props.grocery.location !== null && props.grocery.location !== undefined && <p className="expiration">{LocationNames[props.grocery.location]}</p> }
      </div>
      <button className="icon-button edit-button" onClick={() => props.onClick(props.grocery)}><FontAwesomeIcon icon={faPencil} /></button>

      <div className="status-container">
        <select
          className={`status ${GroceryStatus[status]}`}
          value={status}
          onChange={(e) => onStatusChange(Number(e.target.value) as GroceryStatus)}
        >
          {Object.keys(GroceryStatus)
            .filter((key) => isNaN(Number(key)))
            .map((key) => (
              <option key={GroceryStatus[key]} value={GroceryStatus[key]}>
                {key}
              </option>
            ))}
        </select>
        <div className="status-date">Updated {timeAgo(statusDate)}</div>
      </div>

      <div className="tags">
        {props.grocery.tags.map((tag, index) => (
          <div key={index} className="tag chip">{tag}</div>
        ))}
      </div>
    </div>
  );
};


