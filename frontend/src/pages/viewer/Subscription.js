import React from 'react';
import { FaRegCalendarAlt, FaRegCreditCard, FaTv, FaDownload, FaMobileAlt, FaUsers, FaCheck, FaTimes } from 'react-icons/fa';
import { MdOutlineTrendingUp } from 'react-icons/md';

const ViewerSubscription = () => {
  const styles = {
    container: {
      backgroundColor: '#0a0d14',
      minHeight: '100vh',
      color: '#fff',
      fontFamily: '"Inter", sans-serif',
      padding: '40px 60px',
      paddingBottom: '80px',
    },
    headerWrapper: {
      marginBottom: '40px',
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '28px',
      fontWeight: '700',
      color: '#fdfdfd',
      margin: '0 0 8px 0',
    },
    headerSubtitle: {
      color: '#a0a3b1',
      fontSize: '14px',
      margin: 0,
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '20px',
      marginTop: '40px',
    },
    currentPlanCard: {
      backgroundColor: '#20183b',
      borderRadius: '12px',
      padding: '30px',
      border: '1px solid rgba(122, 50, 240, 0.4)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    currentPlanLeft: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '24px',
    },
    iconBox: {
      width: '50px',
      height: '50px',
      backgroundColor: '#7A32F0',
      borderRadius: '12px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    planTitle: {
      fontSize: '20px',
      fontWeight: '700',
      marginBottom: '5px',
    },
    planPrice: {
      fontSize: '28px',
      fontWeight: '700',
      color: '#7A32F0',
      marginBottom: '10px',
    },
    priceMonth: {
      fontSize: '14px',
      color: '#a0a3b1',
      fontWeight: '500',
    },
    detailRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#a0a3b1',
      fontSize: '13px',
      marginBottom: '6px',
    },
    nextBillingRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#7A32F0',
      fontSize: '13px',
      fontWeight: '600',
      marginTop: '10px',
    },
    buttonsRight: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    btnSolid: {
      backgroundColor: '#7A32F0',
      color: '#fff',
      border: 'none',
      padding: '12px 30px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '180px',
    },
    btnOutline: {
      backgroundColor: 'transparent',
      color: '#fff',
      border: '1px solid #483d6b',
      padding: '12px 30px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '180px',
    },
    entitlementsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
    },
    entitlementCard: {
      backgroundColor: '#151720',
      border: '1px solid #1f2129',
      borderRadius: '12px',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    entIconBox: {
      width: '40px',
      height: '40px',
      backgroundColor: 'rgba(122, 50, 240, 0.1)',
      color: '#7A32F0',
      borderRadius: '8px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '18px',
    },
    entTitle: {
      fontSize: '15px',
      fontWeight: '700',
      marginBottom: '4px',
    },
    entDesc: {
      fontSize: '13px',
      color: '#717380',
    },
    plansGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '24px',
      marginTop: '30px',
    },
    planTierCard: {
      backgroundColor: '#151720',
      border: '1px solid #1f2129',
      borderRadius: '16px',
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    planTierCardPremium: {
      backgroundColor: '#1c1533',
      border: '1px solid rgba(122, 50, 240, 0.5)',
    },
    popularBadge: {
      position: 'absolute',
      top: '-12px',
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#7A32F0',
      color: '#fff',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: '700',
      letterSpacing: '1px',
    },
    tierName: {
      fontSize: '20px',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '10px',
    },
    tierPrice: {
      fontSize: '32px',
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: '20px',
    },
    tierBtnSolid: {
      backgroundColor: '#7A32F0',
      color: '#fff',
      border: 'none',
      padding: '14px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
      marginBottom: '30px',
    },
    tierBtnDisabled: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#a0a3b1',
      border: 'none',
      padding: '14px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      width: '100%',
      marginBottom: '30px',
      cursor: 'default',
    },
    featureList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    featureRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      fontSize: '13px',
    },
    featureCheck: {
      color: '#7A32F0',
      fontSize: '12px',
    },
    featureCross: {
      color: '#4e515d',
      fontSize: '12px',
    },
    featureTextActive: {
      color: '#d1d2d8',
    },
    featureTextInactive: {
      color: '#4e515d',
      textDecoration: 'line-through',
    },
    historyTable: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '10px',
    },
    th: {
      textAlign: 'left',
      color: '#a0a3b1',
      fontSize: '13px',
      fontWeight: '500',
      padding: '16px 20px',
      borderBottom: '1px solid #1f2129',
    },
    td: {
      padding: '20px',
      fontSize: '14px',
      borderBottom: '1px solid #1f2129',
      backgroundColor: '#12141c',
    },
    statusBadge: {
      padding: '4px 12px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '600',
      backgroundColor: 'rgba(122, 50, 240, 0.1)',
      color: '#7A32F0',
      display: 'inline-block',
    },
    downloadLink: {
      color: '#7A32F0',
      textDecoration: 'none',
      fontWeight: '500',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.headerWrapper}>
        <h1 style={styles.headerTitle}>
          <img src="https://cdn-icons-png.flaticon.com/512/5162/5162232.png" alt="Crown" style={{width: '24px', filter: 'invert(1) drop-shadow(0 0 5px rgba(122,50,240,0.8))'}} /> 
          Subscription
        </h1>
        <p style={styles.headerSubtitle}>Manage your plan and billing information</p>
      </div>

      <h2 style={styles.sectionTitle}>Current Plan</h2>
      <div style={styles.currentPlanCard}>
        <div style={styles.currentPlanLeft}>
          <div style={styles.iconBox}>
            <img src="https://cdn-icons-png.flaticon.com/512/5162/5162232.png" alt="Crown" style={{width: '24px', filter: 'invert(1)'}} /> 
          </div>
          <div>
            <div style={styles.planTitle}>Premium Plan</div>
            <div style={styles.planPrice}>$14.99<span style={styles.priceMonth}>/month</span></div>
            <div style={styles.detailRow}><FaRegCalendarAlt /> Started: March 10, 2026</div>
            <div style={styles.detailRow}><FaRegCreditCard /> Payment: Visa ****4242</div>
            <div style={styles.nextBillingRow}><MdOutlineTrendingUp /> Next billing: April 10, 2026</div>
          </div>
        </div>
        <div style={styles.buttonsRight}>
          <button style={styles.btnSolid}>Update Payment</button>
          <button style={styles.btnOutline}>Cancel Plan</button>
        </div>
      </div>

      <h2 style={styles.sectionTitle}>Your Entitlements</h2>
      <div style={styles.entitlementsGrid}>
        <div style={styles.entitlementCard}>
          <div style={styles.entIconBox}><FaTv /></div>
          <div>
            <div style={styles.entTitle}>4K Ultra HD Quality</div>
            <div style={styles.entDesc}>Stream in highest quality</div>
          </div>
        </div>
        <div style={styles.entitlementCard}>
          <div style={styles.entIconBox}><FaDownload /></div>
          <div>
            <div style={styles.entTitle}>Download & Watch Offline</div>
            <div style={styles.entDesc}>Up to 4 devices</div>
          </div>
        </div>
        <div style={styles.entitlementCard}>
          <div style={styles.entIconBox}><FaMobileAlt /></div>
          <div>
            <div style={styles.entTitle}>Multi-Device Streaming</div>
            <div style={styles.entDesc}>Watch on 4 devices</div>
          </div>
        </div>
        <div style={styles.entitlementCard}>
          <div style={styles.entIconBox}><FaUsers /></div>
          <div>
            <div style={styles.entTitle}>Family Sharing</div>
            <div style={styles.entDesc}>Share with household</div>
          </div>
        </div>
      </div>

      <h2 style={styles.sectionTitle}>Available Plans</h2>
      <div style={styles.plansGrid}>
        {/* Basic Plan */}
        <div style={styles.planTierCard}>
          <div style={styles.tierName}>Basic</div>
          <div style={styles.tierPrice}>$7.99<span style={styles.priceMonth}>/month</span></div>
          <button style={styles.tierBtnSolid}>Upgrade Now</button>
          
          <div style={styles.featureList}>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>SD Quality (480p)</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Watch on 1 device</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Limited content library</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Ad-supported viewing</span></div>
            
            <div style={styles.featureRow}><FaTimes style={styles.featureCross}/> <span style={styles.featureTextInactive}>HD Quality</span></div>
            <div style={styles.featureRow}><FaTimes style={styles.featureCross}/> <span style={styles.featureTextInactive}>Download & Watch Offline</span></div>
            <div style={styles.featureRow}><FaTimes style={styles.featureCross}/> <span style={styles.featureTextInactive}>4K Ultra HD</span></div>
            <div style={styles.featureRow}><FaTimes style={styles.featureCross}/> <span style={styles.featureTextInactive}>Dolby Atmos Audio</span></div>
          </div>
        </div>

        {/* Standard Plan */}
        <div style={styles.planTierCard}>
          <div style={styles.popularBadge}>MOST POPULAR</div>
          <div style={styles.tierName}>Standard</div>
          <div style={styles.tierPrice}>$12.99<span style={styles.priceMonth}>/month</span></div>
          <button style={styles.tierBtnSolid}>Upgrade Now</button>
          
          <div style={styles.featureList}>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>HD Quality (1080p)</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Watch on 2 devices</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Full content library</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Ad-free viewing</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Download on 2 devices</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Early access to new releases</span></div>
            
            <div style={styles.featureRow}><FaTimes style={styles.featureCross}/> <span style={styles.featureTextInactive}>4K Ultra HD</span></div>
            <div style={styles.featureRow}><FaTimes style={styles.featureCross}/> <span style={styles.featureTextInactive}>Dolby Atmos Audio</span></div>
          </div>
        </div>

        {/* Premium Plan */}
        <div style={{...styles.planTierCard, ...styles.planTierCardPremium}}>
          <div style={styles.tierName}>Premium</div>
          <div style={styles.tierPrice}>$14.99<span style={styles.priceMonth}>/month</span></div>
          <button style={styles.tierBtnDisabled}>Current Plan</button>
          
          <div style={styles.featureList}>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>4K Ultra HD + HDR</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Watch on 4 devices simultaneously</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Full content library + Exclusives</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Ad-free viewing</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Download on 4 devices</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Early access to new releases</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Dolby Atmos Audio</span></div>
            <div style={styles.featureRow}><FaCheck style={styles.featureCheck}/> <span style={styles.featureTextActive}>Priority customer support</span></div>
          </div>
        </div>
      </div>

      <h2 style={styles.sectionTitle}>Billing History</h2>
      <table style={styles.historyTable}>
        <thead>
          <tr>
            <th style={styles.th}>Date</th>
            <th style={styles.th}>Plan</th>
            <th style={styles.th}>Amount</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Invoice</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{...styles.td, borderRadius: '8px 0 0 0'}}>March 10, 2026</td>
            <td style={styles.td}>Premium</td>
            <td style={styles.td}>$14.99</td>
            <td style={styles.td}><span style={styles.statusBadge}>Paid</span></td>
            <td style={{...styles.td, borderRadius: '0 8px 0 0'}}><span style={styles.downloadLink}>Download</span></td>
          </tr>
          <tr>
            <td style={styles.td}>February 10, 2026</td>
            <td style={styles.td}>Premium</td>
            <td style={styles.td}>$14.99</td>
            <td style={styles.td}><span style={styles.statusBadge}>Paid</span></td>
            <td style={styles.td}><span style={styles.downloadLink}>Download</span></td>
          </tr>
          <tr>
            <td style={{...styles.td, borderRadius: '0 0 0 8px', borderBottom: 'none'}}>January 10, 2026</td>
            <td style={{...styles.td, borderBottom: 'none'}}>Standard</td>
            <td style={{...styles.td, borderBottom: 'none'}}>$12.99</td>
            <td style={{...styles.td, borderBottom: 'none'}}><span style={styles.statusBadge}>Paid</span></td>
            <td style={{...styles.td, borderRadius: '0 0 8px 0', borderBottom: 'none'}}><span style={styles.downloadLink}>Download</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewerSubscription;
