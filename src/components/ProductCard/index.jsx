import React, { memo } from 'react';
import { Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Box, Avatar, Tooltip } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { withRouter } from 'react-router-dom';
import classes from './index.module.css';

const navigate = (history, currentPath, id) => () => {
  history.push(`${currentPath}/${id}`);
}

export const ProductCard = ({ product, history, match }) => (
  <Card elevation={3} classes={{root: classes.ProductCard}}>
    <CardActionArea onClick={navigate(history, match.url, product.id)}>
      <CardMedia
        component="img"
        src={product.pictures && product.pictures[0]}
        alt={product.description}
        height="160"
        title={product.name} />
      <CardContent>
        <Box component="header" mb="3">
          <Typography gutterBottom variant="h6" component="h4">
            {product.name}
          </Typography>
        </Box>
        <Box component="div">
          <Rating
            value={product.rate}
            readOnly
            precision={0.1}
            classes={{decimal: classes.ProductRate}}
            size="small" />
          <Typography variant="caption">
            ({product.rates_count})
          </Typography>
        </Box>
        <Box component="div">
          <Typography variant="body2" color="textSecondary">
            {product.description}
          </Typography>
        </Box>
        <Box component="output">
          <Typography style={{fontWeight: 'bold'}} color="textPrimary" component="strong">
            ${Number.parseFloat(product.price).toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </CardActionArea>
    <CardActions classes={{root: classes.CardFooter}}>
      <Button size="small" color="primary">
        Add to cart
      </Button>
      <Tooltip title={product.shop.name} placement="left">
        <Avatar alt={product.shop.name} src={product.shop.avatar} />
      </Tooltip>
    </CardActions>
  </Card>
);

export default withRouter(memo(ProductCard));