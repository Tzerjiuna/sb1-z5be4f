from app import db

class LyUser(db.Model):
    __tablename__ = 'ly_users'
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(80), unique=True, nullable=False)
    username = db.Column(db.String(80))
    realname = db.Column(db.String(120))
    vip_level = db.Column(db.String(20))
    state = db.Column(db.Integer)
    recharge_state = db.Column(db.Integer)
    withdrawals_state = db.Column(db.Integer)
    idcode = db.Column(db.String(80))
    recommend = db.Column(db.String(80))

class LyUserBank(db.Model):
    __tablename__ = 'ly_user_bank'
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(80), db.ForeignKey('ly_users.uid'))
    card_no = db.Column(db.String(80))

class LyUserTotal(db.Model):
    __tablename__ = 'ly_user_total'
    id = db.Column(db.Integer, primary_key=True)
    uid = db.Column(db.String(80), db.ForeignKey('ly_users.uid'))
    total_recharge = db.Column(db.Float)
    total_withdrawals = db.Column(db.Float)
    balance = db.Column(db.Float)
    total_balance = db.Column(db.Float)