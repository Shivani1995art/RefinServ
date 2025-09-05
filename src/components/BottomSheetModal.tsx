import React, { useRef, useEffect, ReactNode } from 'react';
import {
  View,
  Modal,
  TouchableWithoutFeedback,
  Animated,
  PanResponder,
  StyleSheet,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';

interface BottomSheetModalProps {
  visible: boolean;
  onClose: () => void;
  children?: ReactNode;
}

const BottomSheetModal: React.FC<BottomSheetModalProps> = ({ visible, onClose, children }) => {
  const slideAnim = useRef(new Animated.Value(200)).current;
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) =>
        gestureState.dy > 10,
      onPanResponderMove: Animated.event([null, { dy: pan.y }], { useNativeDriver: false }),
      onPanResponderRelease: (_evt: GestureResponderEvent, gestureState: PanResponderGestureState) => {
        if (gestureState.dy > 50) {
          Animated.spring(pan, {
            toValue: { x: 0, y: 200 },
            useNativeDriver: false,
          }).start(() => onClose());
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      pan.setValue({ x: 0, y: 0 });
    } else {
      slideAnim.setValue(200);
    }
  }, [visible, slideAnim, pan]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <Animated.View
            style={[
              styles.modalContent,
              {
                transform: [{ translateY: Animated.add(slideAnim, pan.y) }],
              },
            ]}
            {...panResponder.panHandlers}
          >
            <View style={styles.dragHandle} />
            {children}
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20,
    width: '100%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: '#BDC3C7',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
});

export default BottomSheetModal;
