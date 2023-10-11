import React, { useEffect } from "react";
import { useStoreContext } from "../../utils/globalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";

import { Box } from '@mui/system';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { TextField } from '@mui/material';

const CartItem = ({ item }) => {
  const [state, dispatch] = useStoreContext();

  // execute remove item action from cart
  const removeFromCart = (item) => {
    console.log('hi')
    dispatch({
      type: REMOVE_FROM_CART,
      _id: item._id,
    });
    idbPromise("cart", "delete", { ...item });
  };

  const onChange = (e) => {
    const value = e.target.value;

    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: item._id,
      purchaseQuantity: parseInt(value),
    });

    idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(value) });

  };

  const onAdd = (e) => {
    const currentQuantity = item.purchaseQuantity + 1;

    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: item._id,
      purchaseQuantity: parseInt(currentQuantity),
    });

    idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(currentQuantity) });

  }

  const onRemove = (e) => {
    const currentQuantity = item.purchaseQuantity - 1;

    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: item._id,
      purchaseQuantity: parseInt(currentQuantity),
    });

    idbPromise("cart", "put", { ...item, purchaseQuantity: parseInt(currentQuantity) });
  }

  useEffect(() => {
    if (item.purchaseQuantity === 0) {
      dispatch({
        type: REMOVE_FROM_CART,
        _id: item._id,
      });
      // delete item from index db
      idbPromise("cart", "delete", { ...item });
    }

  }, [item.purchaseQuantity, dispatch, item])

  return (
    <Box
      sx={{
        display: 'grid',
        alignItems: 'center',
        gap: 2,
        my: 1,
        gridTemplateColumns: 'repeat(2, 1fr)',
      }}
    >
      <Box sx={{ gridRow: '1', gridColumn: 'span 2' }}>
        <img src={item.imageSource} style={{ 'width': '10em', 'height': '10em' }} alt="" />
      </Box>

      <Box sx={{ gridRow: '1', gridColumn: '3/5' }}>
        <div>
          {item.name}, ${item.price}
        </div>
        <div>
          <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faMinus} onClick={onRemove} />}>
          </Button>
          <TextField
            variant="outlined"
            type="number"
            size="small"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}
            style={{ 'width': '4em' }}
          />
          <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faPlus} onClick={onAdd} />}>
          </Button>
          <span
            role="img"
            aria-label="trash"
            onClick={() => removeFromCart(item)}
          >
            🗑️
          </span>
        </div>
      </Box>
    </Box>

  );
};

export default CartItem;
