
import React, { useState, useMemo } from 'react';
import { X, Calendar as CalendarIcon, Users, CreditCard, CheckCircle, Bed, Loader2, ShieldCheck, Lock, ArrowRight, Wallet, ChevronLeft, ChevronRight } from 'lucide-react';
import { Room } from '../types';
import { ROOMS } from '../constants';
import { mongoService } from '../services/mongoService';
import { paymentService } from '../services/paymentService';

interface BookingModalProps {
  initialRoom: Room | null;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ initialRoom, onClose }) => {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(initialRoom || ROOMS[0]);
  const [transactionId, setTransactionId] = useState<string>('');
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    email: '',
    fullName: '',
    phone: '',
    paymentMethod: 'GCash'
  });

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectingField, setSelectingField] = useState<'checkIn' | 'checkOut'>('checkIn');

  const currentRoom = selectedRoom || ROOMS[0];

  const pricing = useMemo(() => {
    const total = currentRoom.price;
    const deposit = total * 0.5;
    return { total, deposit };
  }, [currentRoom]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.checkIn || !formData.checkOut) {
      alert("Please select your stay dates.");
      return;
    }
    setStep(step + 1);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const intent = await paymentService.createPaymentSession(pricing.deposit, `Deposit for ${currentRoom.name}`);
      setTransactionId(intent.id);
      await new Promise(resolve => setTimeout(resolve, 3000));
      await mongoService.createBooking({
        ...formData,
        roomId: currentRoom.id,
        roomName: currentRoom.name,
        totalAmount: pricing.total,
        depositPaid: pricing.deposit,
        paymentStatus: 'Paid',
        transactionId: intent.id,
        paymentMethod: formData.paymentMethod
      });
      setStep(4);
    } catch (error) {
      alert("Payment issue. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  // Helper for Calendar
  const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

  const days = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const totalDays = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const daysArr = [];
    for (let i = 0; i < firstDay; i++) daysArr.push(null);
    for (let i = 1; i <= totalDays; i++) daysArr.push(new Date(year, month, i));
    return daysArr;
  }, [currentMonth]);

  const formatDateString = (date: Date) => date.toISOString().split('T')[0];

  const handleDateClick = (date: Date) => {
    const dateStr = formatDateString(date);
    if (selectingField === 'checkIn') {
      setFormData({ ...formData, checkIn: dateStr, checkOut: '' });
      setSelectingField('checkOut');
    } else {
      if (new Date(dateStr) <= new Date(formData.checkIn)) {
        setFormData({ ...formData, checkIn: dateStr, checkOut: '' });
      } else {
        setFormData({ ...formData, checkOut: dateStr });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-4">
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[95vh] flex flex-col">
        
        <div className="bg-resort-green p-6 md:p-8 text-white shrink-0">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Lock size={12} className="text-emerald-400" />
                <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400">Secure Checkout</span>
              </div>
              <h2 className="text-xl md:text-3xl font-bold">{step === 4 ? 'Confirmed' : 'Reservation'}</h2>
              <p className="text-xs opacity-70 mt-1">{currentRoom.name}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full"><X size={20} /></button>
          </div>
        </div>

        <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar">
          {step < 4 && (
            <div className="flex items-center justify-between mb-8 max-w-xs mx-auto">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex flex-col items-center">
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-xs font-bold ${step >= s ? 'bg-resort-green text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {step > s ? <CheckCircle size={16} /> : s}
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest mt-2 ${step >= s ? 'text-resort-green' : 'text-slate-300'}`}>
                    {s === 1 ? 'Stay' : s === 2 ? 'Guest' : 'Pay'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {step === 4 ? (
            <div className="text-center py-4">
              <CheckCircle size={48} className="text-emerald-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Successful!</h3>
              <p className="text-slate-500 text-sm mb-8">Reservation ID: {transactionId}</p>
              <button onClick={onClose} className="w-full bg-resort-green text-white py-4 rounded-xl font-bold">Close</button>
            </div>
          ) : (
            <div className="space-y-6">
              {step === 1 && (
                <div className="space-y-6">
                  {/* Visual Date Picker Display */}
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setSelectingField('checkIn')}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${selectingField === 'checkIn' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-slate-50'}`}
                    >
                      <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Check-In</span>
                      <span className="text-sm font-bold text-slate-800">{formData.checkIn || 'Select Date'}</span>
                    </button>
                    <button 
                      onClick={() => setSelectingField('checkOut')}
                      className={`p-4 rounded-2xl border-2 transition-all text-left ${selectingField === 'checkOut' ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-slate-50'}`}
                    >
                      <span className="text-[10px] font-black uppercase text-slate-400 block mb-1">Check-Out</span>
                      <span className="text-sm font-bold text-slate-800">{formData.checkOut || 'Select Date'}</span>
                    </button>
                  </div>

                  {/* Calendar Grid */}
                  <div className="bg-white border border-slate-100 rounded-[1.5rem] p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} className="p-2 hover:bg-slate-100 rounded-full"><ChevronLeft size={16}/></button>
                      <span className="text-sm font-black uppercase tracking-widest">{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
                      <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} className="p-2 hover:bg-slate-100 rounded-full"><ChevronRight size={16}/></button>
                    </div>
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                        <div key={d} className="text-[10px] font-black text-slate-300 text-center py-2">{d}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((date, i) => {
                        if (!date) return <div key={i} />;
                        const dStr = formatDateString(date);
                        const isSelected = formData.checkIn === dStr || formData.checkOut === dStr;
                        const inRange = formData.checkIn && formData.checkOut && dStr > formData.checkIn && dStr < formData.checkOut;
                        const isToday = dStr === formatDateString(new Date());
                        const isPast = date < new Date(new Date().setHours(0,0,0,0));

                        return (
                          <button
                            key={i}
                            disabled={isPast}
                            onClick={() => handleDateClick(date)}
                            className={`
                              aspect-square text-xs font-bold rounded-xl transition-all flex items-center justify-center
                              ${isSelected ? 'bg-emerald-600 text-white shadow-lg scale-110' : ''}
                              ${inRange ? 'bg-emerald-50 text-emerald-700' : ''}
                              ${!isSelected && !inRange ? 'hover:bg-slate-50 text-slate-700' : ''}
                              ${isToday && !isSelected ? 'text-emerald-600 border border-emerald-100' : ''}
                              ${isPast ? 'opacity-20 cursor-not-allowed' : ''}
                            `}
                          >
                            {date.getDate()}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Number of Guests</label>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
                      {[1, 2, 4, 6, 10, 15].map(n => (
                        <button key={n} type="button" onClick={() => setFormData({...formData, guests: n})} className={`shrink-0 w-12 py-3 rounded-xl font-bold text-xs border-2 transition-all ${formData.guests === n ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-400'}`}>{n}</button>
                      ))}
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleNext} 
                    className="w-full bg-resort-green text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-emerald-800 transition-all mt-4"
                  >
                    Continue to Guest Info
                  </button>
                </div>
              )}
              {step === 2 && (
                <form onSubmit={handleNext} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                    <input type="text" required placeholder="John Doe" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-4 text-sm font-bold" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Address</label>
                    <input type="email" required placeholder="john@example.com" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-4 text-sm font-bold" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phone Number</label>
                    <input type="tel" required placeholder="09XX XXX XXXX" className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl p-4 text-sm font-bold" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <button type="submit" className="w-full bg-resort-green text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-emerald-800 transition-all mt-4">Continue to Payment</button>
                </form>
              )}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100">
                    <div className="flex justify-between text-xs mb-3"><span className="text-slate-500 font-bold uppercase tracking-widest">Stay Duration</span><span className="font-bold text-slate-800">{formData.checkIn} to {formData.checkOut}</span></div>
                    <div className="flex justify-between text-xs mb-3"><span className="text-slate-500 font-bold uppercase tracking-widest">Required Deposit (50%)</span><span className="font-bold text-emerald-600">₱{pricing.deposit.toLocaleString()}</span></div>
                    <div className="flex justify-between text-lg font-black border-t border-slate-200 pt-3 text-slate-900"><span>Total Cost</span><span>₱{pricing.total.toLocaleString()}</span></div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select Payment Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      {['GCash', 'Maya', 'Visa', 'Mastercard'].map(m => (
                        <button key={m} onClick={() => setFormData({...formData, paymentMethod: m})} className={`p-4 rounded-xl border-2 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${formData.paymentMethod === m ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-400'}`}>
                          {m === 'GCash' && <Wallet size={14}/>}
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button onClick={handlePayment} disabled={isProcessing} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3">
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Securing Reservation...
                      </>
                    ) : (
                      `Pay ₱${pricing.deposit.toLocaleString()} Deposit`
                    )}
                  </button>
                  <div className="flex items-center justify-center gap-2 text-slate-400">
                    <ShieldCheck size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Secured by SSL Encryption</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
