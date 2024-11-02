import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getWallets, addWallet, updateWallet, deleteWallet } from '../api/wallets';

const { Option } = Select;

function Wallets() {
  const [modalVisible, setModalVisible] = useState(false);
  const [editingWallet, setEditingWallet] = useState<any>(null);
  const queryClient = useQueryClient();

  const { data: wallets, isLoading } = useQuery(['wallets'], getWallets);

  const addMutation = useMutation(addWallet, {
    onSuccess: () => {
      message.success('Wallet added successfully');
      queryClient.invalidateQueries(['wallets']);
      setModalVisible(false);
    },
  });

  const updateMutation = useMutation(updateWallet, {
    onSuccess: () => {
      message.success('Wallet updated successfully');
      queryClient.invalidateQueries(['wallets']);
      setModalVisible(false);
    },
  });

  const deleteMutation = useMutation(deleteWallet, {
    onSuccess: () => {
      message.success('Wallet deleted successfully');
      queryClient.invalidateQueries(['wallets']);
    },
  });

  const columns = [
    {
      title: 'Type',
      dataIndex: 'bank',
      key: 'bank',
    },
    {
      title: 'Account',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: 'Status',
      dataIndex: 'state',
      key: 'state',
      render: (state: number) => state === 1 ? '开启' : '关闭',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div>
          <Button 
            type="primary" 
            onClick={() => {
              setEditingWallet(record);
              setModalVisible(true);
            }}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button 
            danger
            onClick={() => {
              if (window.confirm('Are you sure you want to delete this wallet?')) {
                deleteMutation.mutate(record.id);
              }
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  const handleSubmit = (values: any) => {
    if (editingWallet) {
      updateMutation.mutate({ id: editingWallet.id, ...values });
    } else {
      addMutation.mutate(values);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button 
          type="primary" 
          onClick={() => {
            setEditingWallet(null);
            setModalVisible(true);
          }}
        >
          Add Wallet
        </Button>
      </div>

      <Table 
        columns={columns} 
        dataSource={wallets} 
        loading={isLoading}
        rowKey="id"
      />

      <Modal
        title={editingWallet ? 'Edit Wallet' : 'Add Wallet'}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form
          initialValues={editingWallet}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <Form.Item
            name="bank"
            label="Type"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="TRC20">TRC20</Option>
              <Option value="ERC20">ERC20</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="account"
            label="Account"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="state"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value={1}>开启</Option>
              <Option value={0}>关闭</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={addMutation.isLoading || updateMutation.isLoading}
            >
              {editingWallet ? 'Update' : 'Add'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Wallets;