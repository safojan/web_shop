import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import Button from "@material-ui/core/Button";

import CardM from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import CssBaseline from "@material-ui/core/CssBaseline";
import DeleteIcon from "@material-ui/icons/Delete";
import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/AttachMoney";
import WorkIcon from "@material-ui/icons/Category";
import { addItem, updateItem, removeItem } from "./cartHelpers";
import BeachAccessIcon from "@material-ui/icons/PostAdd";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    borderRadius: "20px",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 2,
  },
  productDescription: {
    height: "100px",
    margin: "10px",
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },

  typography: {
    fontFamily: ["Roboto"],
  },
}));

const Card = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = (f) => f, // default value of function
  run = undefined, // default value of undefined
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return (
      showViewProductButton && (
        <Link href={`/product/${product._id}`} className="mr-2" size="small">
          <Button variant="contained" color="primary">
            View Product
          </Button>
        </Link>
      )
    );
  };

  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = (showAddToCartButton) => {
    return (
      showAddToCartButton && (
        <Button
          onClick={addToCart}
          variant="outlined"
          color="secondary"
          size="small"
        >
          Add to cart
        </Button>
      )
    );
  };

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleChange = (productId) => (event) => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className="mt-2">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input
              type="number"
              className="form-control"
              value={count}
              onChange={handleChange(product._id)}
            />
          </div>
        </div>
      )
    );
  };

  const showRemoveButton = (showRemoveProductButton) => {
    return (
      showRemoveProductButton && (
        <Button
          size="medium"
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<DeleteIcon />}
        >
          Remove Product
        </Button>
      )
    );
  };

  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12} md={12}>
          <CardM className={classes.card}>
            {shouldRedirect(redirect)}
            <ShowImage item={product} url="product" />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5" component="h3">
                {product.name}
              </Typography>

              <div>
                {showStock(product.quantity)}
                <List
                  sx={{
                    width: "50%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={product.price} secondary="PKR" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Category"
                      secondary={product.category && product.category.name}
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary="Posted"
                      secondary={moment(product.createdAt).fromNow()}
                    />
                  </ListItem>
                </List>
                <br></br>
              </div>
              <span>
                <ButtonGroup
                  variant="contained"
                  size="small"
                  aria-label="outlined primary button group"
                >
                  {showViewButton(showViewProductButton)}
                  {showAddToCartBtn(showAddToCartButton)}
                  {showRemoveButton(showRemoveProductButton)}
                </ButtonGroup>
              </span>
              {showCartUpdateOptions(cartUpdate)}
            </CardContent>
          </CardM>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Card;
