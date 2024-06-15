import React from 'react';
import {
  getAllProduct,
  deleteProduct,
  createSale,
  deleteSaleProduct,
} from '../../../http/productApi';
import { deleteProductTrunk } from '../../../http/trunkApi';
import { getAllBrand } from '../../../http/brandApi';
import { Button, Container, Spinner, Table, Col, Form } from 'react-bootstrap';
import CreateProduct from './modals/CreateProduct';
import UpdateProduct from './modals/UpdateProduct';
import CreateProductTrunk from './modals/CreateProductTrunk';
import UpdateProductTrunk from './modals/UpdateProductTrunk';
import UpdatePrice from './modals/UpdatePrice';
import CreateProductThirdrow from './modals/CreateProductThirdrow';
import UpdateProductThirdrow from './modals/UpdateProductThirdrow';
import { deleteProductThirdrow } from '../../../http/thirdrowApi';

import './style.scss';

const AdminProduct = () => {
  const [products, setProducts] = React.useState([]);
  const [fetching, setFetching] = React.useState(true);
  const [createShow, setCreateShow] = React.useState(false);
  const [change, setChange] = React.useState(true);
  const [updateShow, setUpdateShow] = React.useState(false);
  const [productId, setProductId] = React.useState(null);
  const [trunkId, setTrunkId] = React.useState(null);
  const [createTrunk, setCreateTrunk] = React.useState(false);
  const [updateTrunk, setUpdateTrunk] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [saleProductChechbox, setSaleProductCheckbox] = React.useState(false);
  const [updatePriceModal, setUpdatePriceModal] = React.useState(false);
  const [brands, setBrands] = React.useState([]);
  const [selectedBrand, setSelectedBrand] = React.useState(11);
  const [openBrandModal, setOpenBrandModal] = React.useState(false);
  const [createThirdrow, setCreateThirdrow] = React.useState(false);
  const [updateThirdrow, setUpdateThirdrow] = React.useState(false);
  const [thirdrowId, setThirdrowId] = React.useState(null);

  React.useEffect(() => {
    getAllProduct().then((data) => setProducts(data));
    getAllBrand()
      .then((data) => setBrands(data))
      .finally(() => setFetching(false));
  }, [change]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  React.useEffect(() => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [products, searchQuery]);

  const handleUpdateProduct = (id) => {
    setProductId(id);
    setUpdateShow(true);
  };

  const handleUpdateTrunk = (trunkId, productId) => {
    setTrunkId(trunkId);
    setProductId(productId);
    setUpdateTrunk(true);
  };

  const hadleCreateTrunk = (productId) => {
    setProductId(productId);
    setCreateTrunk(true);
  };

  const handleUpdatePrice = (id) => {
    setProductId(id);
    setUpdatePriceModal(true);
  };

  const handleDeleteClick = (id) => {
    deleteProduct(id)
      .then((data) => {
        setChange(!change);
        alert(`Товар «${data.name}» удален`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  const handleDeleteTrunk = (id) => {
    deleteProductTrunk(id)
      .then((data) => {
        setChange(!change);
        alert(`Коврик удален`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  const handleSaleCreate = (id) => {
    setProductId(id);
    createSale(id, { sale: 1 }).catch((error) => alert(error.response.data.message));
  };

  const handleDeleteSaleProduct = (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить товар из акции?');
    if (confirmed) {
      deleteSaleProduct(id)
        .then(() => {
          alert('Товар из акции удален');
        })
        .catch((error) => alert(error.response.data.message));
    }
  };

  const handleCreateThirdrow = (productId) => {
    setProductId(productId);
    setCreateThirdrow(true);
  };

  const handleUpdateThirdrow = (thirdrowId, productId) => {
    setThirdrowId(thirdrowId);
    setProductId(productId);
    setUpdateThirdrow(true);
  };

  const handleDeleteThirdrow = (id) => {
    deleteProductThirdrow(id)
      .then((data) => {
        setChange(!change);
        alert(`Коврик удален`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  const handleSaleCheckboxChange = () => {
    const updatedValue = !saleProductChechbox;
    setSaleProductCheckbox(updatedValue);
    const filtered = updatedValue ? products.filter((product) => product.sale === 1) : products;
    setFilteredProducts(filtered);
  };

  const hadleOpenBrandModal = () => {
    setOpenBrandModal(!openBrandModal);
  };

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Товары</h1>
      <Button onClick={() => setCreateShow(true)}>Создать карточку товара</Button>
      <Col className="mt-3" sm={2}>
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Поиск..."
            value={searchQuery}
            onChange={handleSearch}
            className="mb-3"
            aria-label="Search"
          />
        </Form>
      </Col>
      <CreateProduct show={createShow} setShow={setCreateShow} setChange={setChange} />
      <UpdateProduct
        show={updateShow}
        setShow={setUpdateShow}
        setChange={setChange}
        id={productId}
      />
      <UpdatePrice
        show={updatePriceModal}
        setShow={setUpdatePriceModal}
        setChange={setChange}
        id={productId}
      />
      <CreateProductTrunk
        show={createTrunk}
        setShow={setCreateTrunk}
        setChange={setChange}
        productId={productId}
      />
      <UpdateProductTrunk
        show={updateTrunk}
        setShow={setUpdateTrunk}
        setChange={setChange}
        productId={productId}
        trunkId={trunkId}
      />
      <CreateProductThirdrow
        show={createThirdrow}
        setShow={setCreateThirdrow}
        setChange={setChange}
        productId={productId}
      />
      <UpdateProductThirdrow
        show={updateThirdrow}
        setShow={setUpdateThirdrow}
        setChange={setChange}
        productId={productId}
        thirdrowId={thirdrowId}
      />
      <div className="checkbox" style={{ display: 'flex' }}>
        <div class="cntr">
          <label for="cbxSale" class="label-cbx">
            <input
              id="cbxSale"
              type="checkbox"
              class="invisible"
              checked={saleProductChechbox}
              onChange={() => {
                handleSaleCheckboxChange();
              }}
            />
            <div class="checkbox">
              <svg width="20px" height="20px" viewBox="0 0 20 20">
                <path d="M3,1 L17,1 L17,1 C18.1045695,1 19,1.8954305 19,3 L19,17 L19,17 C19,18.1045695 18.1045695,19 17,19 L3,19 L3,19 C1.8954305,19 1,18.1045695 1,17 L1,3 L1,3 C1,1.8954305 1.8954305,1 3,1 Z"></path>
                <polyline points="4 11 8 15 16 6"></polyline>
              </svg>
            </div>
          </label>
        </div>{' '}
        <span>Товары в акции</span>
      </div>
      <div className="brand">
        <div className="brand__title" onClick={hadleOpenBrandModal}>
          Марка:{' '}
          <span>
            {selectedBrand
              ? selectedBrand && brands.find((brand) => brand.id === selectedBrand)?.name
              : ''}
          </span>
        </div>
        {openBrandModal && (
          <div className="brand__modal">
            <div className="brand__modal-content">
              <div
                className="brand__modal-item"
                onClick={() => {
                  setSelectedBrand(null);
                  setOpenBrandModal(false);
                }}></div>
              {brands.map((brandName) => (
                <div key={brandName.id}>
                  <div
                    className="brand__modal-item"
                    onClick={() => {
                      setSelectedBrand(brandName.id);
                      setOpenBrandModal(false);
                    }}>
                    {brandName.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div>
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Название</th>
              <th>Редактировать</th>
              <th>Стоимость</th>
              <th>Удалить</th>
              <th>Добавить коврик для багажника</th>
              <th>Редактировать коврик для багажника</th>
              <th>Удалить коврик для багажника</th>
              <th>Добавить третий ряд ковриков</th>
              <th>Редактировать третий ряд ковриков</th>
              <th>Удалить третий ряд ковриков</th>
              <th>Добавить товар в акции</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts
              ?.filter((product) => selectedBrand === null || product.brandId === selectedBrand)
              .map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => handleUpdateProduct(product.id)}>
                      Редактировать
                    </Button>
                  </td>
                  <td style={{ cursor: 'pointer' }} onClick={() => handleUpdatePrice(product.id)}>
                    {product.old_price}/{product.new_price}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteClick(product.id)}>
                      Удалить
                    </Button>
                  </td>
                  <td>
                    {product.trunks.length > 0 && product.trunks[0].id ? (
                      'Добавлен'
                    ) : (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => hadleCreateTrunk(product.id)}>
                        Добавить
                      </Button>
                    )}
                  </td>
                  <td>
                    {product.trunks.length > 0 && product.trunks[0].id ? (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleUpdateTrunk(product.trunks[0].id, product.id)}>
                        Редакатировать
                      </Button>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteTrunk(product.trunks[0].id)}>
                      Удалить
                    </Button>
                  </td>
                  <td>
                    {product.thirdrows.length > 0 && product.thirdrows[0].id ? (
                      'Добавлен'
                    ) : (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleCreateThirdrow(product.id)}>
                        Добавить
                      </Button>
                    )}
                  </td>
                  <td>
                    {product.thirdrows.length > 0 && product.thirdrows[0].id ? (
                      <Button
                        variant="success"
                        size="sm"
                        onClick={() => handleUpdateThirdrow(product.thirdrows[0].id, product.id)}>
                        Редакатировать
                      </Button>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteThirdrow(product.thirdrows[0].id)}>
                      Удалить
                    </Button>
                  </td>
                  <td>
                    {product.sale === null ? (
                      <Button onClick={() => handleSaleCreate(product.id)}>Добавить в акции</Button>
                    ) : (
                      <Button onClick={() => handleDeleteSaleProduct(product.id)}>
                        Удалить из акции
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminProduct;
